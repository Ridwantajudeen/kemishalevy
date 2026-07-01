import { useState } from 'react'
import { BookingSuccess } from './BookingSuccess'
import { submitBookingRequest } from '../../lib/bookings'

const notaryServices = [
  'General notary appointment',
  'Affidavit notarization',
  'Power of attorney',
  'Document witnessing',
  'Business paperwork',
]

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  service: notaryServices[0],
  preferredDate: '',
  preferredTime: 'Morning',
  notes: '',
}

export function BookingForm() {
  const [form, setForm] = useState(initialForm)
  const [submittedBooking, setSubmittedBooking] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const result = await submitBookingRequest({
        ...form,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
      })

      if (result.error) {
        setError(result.error.message || 'We could not submit your booking request.')
        return
      }

      setSubmittedBooking({
        ...form,
        ...(result.data?.booking ?? {}),
        notifications: result.data?.notifications ?? null,
      })
    } catch {
      setError('We could not submit your booking request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedBooking) {
    return <BookingSuccess booking={submittedBooking} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#d6c7d0] bg-white/85 p-6 shadow-[0_18px_60px_rgba(42,26,62,0.08)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Full name</span>
          <input
            required
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Phone number</span>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Email address</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Service needed</span>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          >
            {notaryServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Preferred date</span>
          <input
            required
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-[#2a1a3e]">Preferred time</span>
          <select
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm font-medium text-[#2a1a3e]">Additional notes</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="4"
          className="rounded-2xl border border-[#dccfda] bg-white px-4 py-3 outline-none transition focus:border-[#9b4f7a]"
        />
      </label>

      {error ? <p className="mt-4 text-sm text-[#9b4f7a]">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex rounded-full bg-[#2a1a3e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a2457] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending request...' : 'Submit booking request'}
      </button>
    </form>
  )
}
