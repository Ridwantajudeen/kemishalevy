import { supabase } from './supabase'

const adminBookingsEndpoint = import.meta.env.VITE_ADMIN_BOOKINGS_ENDPOINT?.trim() || '/api/admin/bookings'

async function getAccessToken() {
  if (!supabase) {
    return null
  }

  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

async function requestAdminBookings(method, body) {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return {
      data: null,
      error: new Error('Please sign in again to view bookings.'),
    }
  }

  try {
    const response = await fetch(adminBookingsEndpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      const message = result?.error || result?.message || 'Could not load bookings right now.'
      return { data: null, error: new Error(message) }
    }

    return {
      data: result?.bookings ?? result?.booking ?? result,
      error: null,
    }
  } catch {
    return {
      data: null,
      error: new Error('Could not reach the admin booking server right now.'),
    }
  }
}

export async function loadAdminBookings() {
  return requestAdminBookings('GET')
}

export async function updateAdminBookingStatus(id, status) {
  return requestAdminBookings('PATCH', { id, status })
}
