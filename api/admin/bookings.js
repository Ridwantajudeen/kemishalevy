import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load local .env in dev so service role is available
dotenv.config()

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

function buildSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return { error: 'Supabase backend credentials are not configured.' }
  }

  return {
    serviceClient: createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  }
}

export default async function handler(req, res) {
  const clients = buildSupabaseClient()

  if (clients.error) {
    return res.status(500).json({ error: clients.error })
  }

  const { serviceClient } = clients

  if (req.method === 'GET') {
    const { data, error } = await serviceClient
      .from('booking_requests')
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
      .from('booking_requests')
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
