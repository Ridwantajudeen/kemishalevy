import { hasSupabaseConfig, supabase } from './supabase'

const bookingsEndpoint = import.meta.env.VITE_BOOKINGS_ENDPOINT?.trim()
const useLocalFallback =
  import.meta.env.DEV && Boolean(bookingsEndpoint) && bookingsEndpoint.startsWith('/api/')

function buildBookingPayload(form) {
  return {
    full_name: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    service: form.service.trim(),
    preferred_date: form.preferredDate,
    preferred_time: form.preferredTime.trim(),
    notes: form.notes.trim(),
    status: 'pending',
  }
}

export async function submitBookingRequest(form) {
  const payload = buildBookingPayload(form)

  if (bookingsEndpoint) {
    try {
      const response = await fetch(bookingsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (useLocalFallback && response.status === 404) {
        const { data, error } = await supabase.from('bookings').insert([payload]).select().single()
        return { data, error }
      }

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        const message =
          result?.error ||
          result?.message ||
          'We could not submit your booking request right now.'

        return { data: null, error: new Error(message) }
      }

      return { data: result?.booking ?? result, error: null }
    } catch {
      if (useLocalFallback && hasSupabaseConfig && supabase) {
        const { data, error } = await supabase.from('bookings').insert([payload]).select().single()
        return { data, error }
      }

      return {
        data: null,
        error: new Error('We could not reach the booking server right now.'),
      }
    }
  }

  if (!hasSupabaseConfig || !supabase) {
    return {
      data: null,
      error: new Error('Booking backend is not configured yet.'),
    }
  }

  const { data, error } = await supabase.from('bookings').insert([payload]).select().single()

  return { data, error }
}
