import process from 'node:process'
import { Buffer } from 'node:buffer'

function normalizeWhatsAppAddress(address) {
  const trimmed = address?.trim()

  if (!trimmed) {
    return ''
  }

  return trimmed.startsWith('whatsapp:') ? trimmed : `whatsapp:${trimmed}`
}

function buildBookingText(booking) {
  return [
    'New booking request received.',
    '',
    `Booking number: ${booking.booking_number || 'Not provided'}`,
    `Name: ${booking.full_name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email || 'Not provided'}`,
    `Service: ${booking.service}`,
    `Preferred date: ${booking.preferred_date}`,
    `Preferred time: ${booking.preferred_time}`,
    `Notes: ${booking.notes || 'None'}`,
    '',
    'Website: https://kemishalevy.com',
  ].join('\n')
}

function buildBookingHtml(booking) {
  return `
    <h2>New booking request received</h2>
    <p><strong>Booking number:</strong> ${booking.booking_number || 'Not provided'}</p>
    <p><strong>Name:</strong> ${booking.full_name}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Email:</strong> ${booking.email || 'Not provided'}</p>
    <p><strong>Service:</strong> ${booking.service}</p>
    <p><strong>Preferred date:</strong> ${booking.preferred_date}</p>
    <p><strong>Preferred time:</strong> ${booking.preferred_time}</p>
    <p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
    <p><strong>Website:</strong> <a href="https://kemishalevy.com">kemishalevy.com</a></p>
  `
}

function buildConfirmationText(booking) {
  return [
    'Thank you for your booking request.',
    '',
    `Booking number: ${booking.booking_number || 'Not provided'}`,
    `Hi ${booking.full_name},`,
    '',
    'We received your booking request and will be in touch shortly.',
    '',
    `Service: ${booking.service}`,
    `Preferred date: ${booking.preferred_date}`,
    `Preferred time: ${booking.preferred_time}`,
    '',
    'Thanks,',
    'Kemisha Team',
    'https://kemishalevy.com',
  ].join('\n')
}

function buildConfirmationHtml(booking) {
  return `
    <h2>Thank you for your booking request</h2>
    <p><strong>Booking number:</strong> ${booking.booking_number || 'Not provided'}</p>
    <p>Hi ${booking.full_name},</p>
    <p>We received your booking request and will be in touch shortly.</p>
    <p><strong>Service:</strong> ${booking.service}</p>
    <p><strong>Preferred date:</strong> ${booking.preferred_date}</p>
    <p><strong>Preferred time:</strong> ${booking.preferred_time}</p>
    <p>Thanks,<br />Kemisha Team</p>
    <p><a href="https://kemishalevy.com">kemishalevy.com</a></p>
  `
}

function normalizeRecipients(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean)
  }

  return (value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function normalizeEmailFrom(value) {
  const trimmed = value?.trim()

  if (!trimmed) {
    return ''
  }

  if (trimmed.includes('<') && trimmed.includes('>')) {
    return trimmed
  }

  return `Kemisha Team <${trimmed}>`
}

function getBookingStatusLabel(status) {
  switch (status) {
    case 'confirmed':
      return 'confirmed'
    case 'cancelled':
      return 'cancelled'
    case 'done':
      return 'completed'
    default:
      return status || 'updated'
  }
}

function getBookingStatusSubject(status) {
  switch (status) {
    case 'confirmed':
      return 'Your booking has been confirmed'
    case 'cancelled':
      return 'Your booking has been cancelled'
    case 'done':
      return 'Thank you for booking with Kemisha Levy'
    default:
      return 'Your booking has been updated'
  }
}

function buildStatusEmailText(booking, status, note) {
  const statusLabel = getBookingStatusLabel(status)

  return [
    `Your booking has been ${statusLabel}.`,
    '',
    `Booking number: ${booking.booking_number || 'Not provided'}`,
    `Service: ${booking.service}`,
    `Preferred date: ${booking.preferred_date}`,
    `Preferred time: ${booking.preferred_time}`,
    note ? '' : null,
    note ? `Note: ${note}` : null,
    '',
    'Thanks,',
    'Kemisha Team',
    'https://kemishalevy.com',
  ]
    .filter((line) => line !== null)
    .join('\n')
}

function buildStatusEmailHtml(booking, status, note) {
  const statusLabel = getBookingStatusLabel(status)
  const noteMarkup = note ? `<p><strong>Note:</strong> ${note}</p>` : ''

  return `
    <h2>Your booking has been ${statusLabel}</h2>
    <p><strong>Booking number:</strong> ${booking.booking_number || 'Not provided'}</p>
    <p><strong>Service:</strong> ${booking.service}</p>
    <p><strong>Preferred date:</strong> ${booking.preferred_date}</p>
    <p><strong>Preferred time:</strong> ${booking.preferred_time}</p>
    ${noteMarkup}
    <p>Thanks,<br />Kemisha Team</p>
    <p><a href="https://kemishalevy.com">kemishalevy.com</a></p>
  `
}

async function sendWhatsAppMessage(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim()
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  const from = normalizeWhatsAppAddress(
    process.env.TWILIO_WHATSAPP_FROM?.trim() || process.env.TWILIO_WHATSAPP_SANDBOX_FROM?.trim() || 'whatsapp:+14155238886',
  )
  const to = normalizeWhatsAppAddress(process.env.WHATSAPP_NOTIFICATION_TO?.trim())

  if (!accountSid || !authToken || !from || !to) {
    return { sent: false, skipped: true, reason: 'missing_whatsapp_config' }
  }

  const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: message,
  }).toString()

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('WhatsApp notification failed', { reason: 'twilio_error', details: text })
    return { sent: false, skipped: false, reason: 'twilio_error', details: text }
  }

  return { sent: true, skipped: false }
}

async function sendSmsMessage(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim()
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  const from = process.env.TWILIO_SMS_FROM?.trim() || process.env.TWILIO_PHONE_NUMBER?.trim()
  const to = process.env.SMS_NOTIFICATION_TO?.trim() || process.env.WHATSAPP_NOTIFICATION_TO?.trim()

  if (!accountSid || !authToken || !from || !to) {
    return { sent: false, skipped: true, reason: 'missing_sms_config' }
  }

  const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: message,
  }).toString()

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const text = await response.text()
    console.error('SMS notification failed', { reason: 'twilio_error', details: text })
    return { sent: false, skipped: false, reason: 'twilio_error', details: text }
  }

  return { sent: true, skipped: false }
}

async function sendEmailMessage({ recipients, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = normalizeEmailFrom(process.env.EMAIL_FROM)
  const to = normalizeRecipients(recipients)

  if (!apiKey || !from || to.length === 0) {
    return { sent: false, skipped: true, reason: 'missing_email_config' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        text,
      }),
    })

    if (!response.ok) {
      const textResponse = await response.text()
      let details = textResponse

      try {
        const parsed = JSON.parse(textResponse)
        details = parsed?.message || parsed?.error || parsed?.details || textResponse
      } catch {
        // Keep the raw response text when Resend does not return JSON.
      }

      console.error('Email notification failed', {
        reason: 'resend_error',
        status: response.status,
        details,
      })
      return { sent: false, skipped: false, reason: 'resend_error', details, status: response.status }
    }

    return { sent: true, skipped: false }
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    console.error('Email notification failed', {
      reason: 'request_error',
      details,
    })
    return { sent: false, skipped: false, reason: 'request_error', details }
  }
}

export async function notifyBookingSubmission(booking) {
  const message = buildBookingText(booking)
  const adminRecipients = normalizeRecipients(process.env.EMAIL_TO)
  const customerRecipients = normalizeRecipients(booking.email)

  const [whatsappResult, adminEmailResult, customerEmailResult, smsResult] = await Promise.allSettled([
    sendWhatsAppMessage(message),
    sendEmailMessage({
      recipients: adminRecipients,
      subject: 'New booking request',
      html: buildBookingHtml(booking),
      text: buildBookingText(booking),
    }),
    customerRecipients.length > 0
      ? sendEmailMessage({
          recipients: customerRecipients,
          subject: 'Your booking request has been received',
          html: buildConfirmationHtml(booking),
          text: buildConfirmationText(booking),
        })
      : Promise.resolve({ sent: false, skipped: true, reason: 'missing_customer_email' }),
    sendSmsMessage(message),
  ])

  const whatsapp = whatsappResult.status === 'fulfilled' ? whatsappResult.value : { sent: false, skipped: false, reason: 'notification_error' }
  const email =
    adminEmailResult.status === 'fulfilled'
      ? adminEmailResult.value
      : { sent: false, skipped: false, reason: 'notification_error', details: String(adminEmailResult.reason?.message || adminEmailResult.reason || 'unknown error') }
  const confirmation =
    customerEmailResult.status === 'fulfilled'
      ? customerEmailResult.value
      : { sent: false, skipped: false, reason: 'notification_error', details: String(customerEmailResult.reason?.message || customerEmailResult.reason || 'unknown error') }
  const sms = smsResult.status === 'fulfilled' ? smsResult.value : { sent: false, skipped: false, reason: 'notification_error', details: String(smsResult.reason?.message || smsResult.reason || 'unknown error') }

  if (!email.sent && !email.skipped && email.reason === 'resend_error') {
    console.error('Admin email notification failed', email)
  }

  if (!confirmation.sent && !confirmation.skipped && confirmation.reason === 'resend_error') {
    console.error('Customer confirmation email failed', confirmation)
  }

  if (!whatsapp.sent && !whatsapp.skipped) {
    console.warn('WhatsApp notification failed; SMS fallback result:', sms)
  }

  return {
    whatsapp,
    email,
    confirmation,
    sms,
  }
}

export async function notifyBookingStatusChange(booking, { status, note }) {
  const recipients = normalizeRecipients(booking.email)

  if (recipients.length === 0) {
    return { sent: false, skipped: true, reason: 'missing_customer_email' }
  }

  return sendEmailMessage({
    recipients,
    subject: getBookingStatusSubject(status),
    html: buildStatusEmailHtml(booking, status, note),
    text: buildStatusEmailText(booking, status, note),
  })
}
