function buildBookingPayload(form) {
  const payload = {
    full_name: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    service: form.service.trim(),
    preferred_date: form.preferredDate,
    preferred_time: form.preferredTime.trim(),
    notes: form.notes.trim(),
    status: 'pending',
  }
  return payload
}

export async function submitBookingRequest(form) {
  const payload = buildBookingPayload(form)

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      return { data: null, error: new Error(result.error) }
    }

    return { data: result, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}
