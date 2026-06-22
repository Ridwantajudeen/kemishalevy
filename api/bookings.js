import { Buffer } from 'node:buffer'
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

function formatWhatsAppMessage(booking) {
  return [
    'New booking request from Kemisha Levy site',
    `Name: ${booking.full_name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email || 'Not provided'}`,
    `Service: ${booking.service}`,
    `Date: ${booking.preferred_date}`,
    `Time: ${booking.preferred_time || 'Not selected'}`,
    `Notes: ${booking.notes || 'None'}`,
  ].join('\n')
}

async function sendWhatsAppNotification(booking) {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP_FROM,
    WHATSAPP_NOTIFICATION_TO,
  } = process.env

  if (
    !TWILIO_ACCOUNT_SID ||
    !TWILIO_AUTH_TOKEN ||
    !TWILIO_WHATSAPP_FROM ||
    !WHATSAPP_NOTIFICATION_TO
  ) {
    return { sent: false, skipped: true }
  }

  const body = new URLSearchParams()
  body.set('From', TWILIO_WHATSAPP_FROM)
  body.set('To', WHATSAPP_NOTIFICATION_TO)
  body.set('Body', formatWhatsAppMessage(booking))

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`,
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    },
  )

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`WhatsApp notification failed: ${details}`)
  }

  return { sent: true }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = readBody(req)

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
    full_name: String(payload.full_name).trim(),
    phone: String(payload.phone).trim(),
    email: String(payload.email ?? '').trim(),
    service: String(payload.service).trim(),
    preferred_date: String(payload.preferred_date).trim(),
    preferred_time: String(payload.preferred_time ?? '').trim(),
    notes: String(payload.notes ?? '').trim(),
    status: 'pending',
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingToInsert])
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  let whatsapp = { sent: false, skipped: true }

  try {
    whatsapp = await sendWhatsAppNotification(data)
  } catch (notificationError) {
    return res.status(201).json({
      booking: data,
      warning: notificationError.message,
      whatsapp,
    })
  }

  return res.status(201).json({
    booking: data,
    whatsapp,
  })
}
