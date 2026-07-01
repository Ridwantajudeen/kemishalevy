const adminBookingsEndpoint = import.meta.env.VITE_ADMIN_BOOKINGS_ENDPOINT?.trim() || '/api/admin/bookings'

async function requestAdminBookings(method, body) {
  try {
    const response = await fetch(adminBookingsEndpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
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

export async function updateAdminBookingStatus(id, status, note = '') {
  return requestAdminBookings('PATCH', { id, status, note })
}
