import process from 'node:process'
import { randomBytes } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { notifyBookingSubmission } from './notifications.js'

// Load local .env for dev mode so the service role key is available
dotenv.config()

function parseJsonBody(req) {
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

function generateBookingNumber() {
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const randomPart = randomBytes(3).toString('hex').toUpperCase()

  return `BKG-${datePart}-${randomPart}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = parseJsonBody(req)

  if (!payload) {
    return res.status(400).json({ error: 'Invalid request body.' })
  }

  const requiredFields = ['full_name', 'phone', 'service', 'preferred_date', 'preferred_time']
  const missingField = requiredFields.find((field) => !String(payload[field] ?? '').trim())

  if (missingField) {
    return res.status(400).json({ error: `Missing required field: ${missingField}` })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({
      error: 'Supabase backend credentials are not configured.',
    })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

  const bookingToInsert = {
    booking_number: generateBookingNumber(),
    full_name: String(payload.full_name).trim(),
    phone: String(payload.phone).trim(),
    email: String(payload.email ?? '').trim(),
    service: String(payload.service).trim(),
    preferred_date: String(payload.preferred_date).trim(),
    preferred_time: String(payload.preferred_time ?? '').trim(),
    notes: String(payload.notes ?? '').trim(),
    status: 'pending',
    status_note: null,
    status_changed_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('booking_requests')
    .insert([bookingToInsert])
    .select('*')
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const notificationResult = await notifyBookingSubmission(bookingToInsert)

  return res.status(201).json({
    success: true,
    booking: data,
    notifications: notificationResult,
  })
}
