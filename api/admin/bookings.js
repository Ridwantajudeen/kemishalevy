import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

function readBody(req) {
  if (!req.body) {
    return null
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }

  return req.body
}

function getBearerToken(req) {
  const header = req.headers.authorization || req.headers.Authorization || ''
  if (!header.startsWith('Bearer ')) {
    return null
  }

  return header.slice('Bearer '.length).trim()
}

function buildSupabaseClients() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    return { error: 'Supabase backend credentials are not configured.' }
  }

  return {
    authClient: createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
    serviceClient: createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  }
}

async function assertAdmin(req) {
  const token = getBearerToken(req)
  if (!token) {
    return { error: 'Missing authorization token.' }
  }

  const clients = buildSupabaseClients()
  if (clients.error) {
    return { error: clients.error }
  }

  const { authClient } = clients
  const { data, error } = await authClient.auth.getUser(token)

  if (error || !data?.user) {
    return { error: 'Invalid admin session.' }
  }

  const allowedAdminUserId = process.env.SUPABASE_ADMIN_USER_ID
  if (!allowedAdminUserId) {
    return { error: 'Admin user is not configured.' }
  }

  if (data.user.id !== allowedAdminUserId) {
    return { error: 'You do not have access to this dashboard.' }
  }

  return { serviceClient: clients.serviceClient }
}

export default async function handler(req, res) {
  const adminCheck = await assertAdmin(req)

  if (adminCheck.error) {
    return res.status(403).json({ error: adminCheck.error })
  }

  const { serviceClient } = adminCheck

  if (req.method === 'GET') {
    const { data, error } = await serviceClient
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ bookings: data ?? [] })
  }

  if (req.method === 'PATCH') {
    const payload = readBody(req)

    if (!payload?.id || !payload?.status) {
      return res.status(400).json({ error: 'Missing booking id or status.' })
    }

    const { data, error } = await serviceClient
      .from('bookings')
      .update({ status: payload.status })
      .eq('id', payload.id)
      .select('*')
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ booking: data })
  }

  res.setHeader('Allow', 'GET, PATCH')
  return res.status(405).json({ error: 'Method not allowed' })
}
