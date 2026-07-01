import { useState } from 'react'
import { useBookings } from '../../hooks/useBookings'

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled', 'done']
const actionableStatuses = ['confirmed', 'cancelled', 'done']

function getStatusClass(status) {
  switch (status) {
    case 'confirmed':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800'
    case 'cancelled':
      return 'border-rose-200 bg-rose-50 text-rose-800'
    case 'done':
      return 'border-sky-200 bg-sky-50 text-sky-800'
    default:
      return 'border-amber-200 bg-amber-50 text-amber-800'
  }
}

function getActionLabel(status) {
  switch (status) {
    case 'confirmed':
      return 'Confirm'
    case 'cancelled':
      return 'Cancel'
    case 'done':
      return 'Mark done'
    default:
      return 'Update'
  }
}

function getDefaultNote(status, booking) {
  const bookingNumber = booking.booking_number || 'this booking'

  switch (status) {
    case 'confirmed':
      return `Booking ${bookingNumber} has been confirmed. We look forward to seeing you.`
    case 'cancelled':
      return `Booking ${bookingNumber} has been cancelled. Please contact us if you need to reschedule.`
    case 'done':
      return `Thank you for choosing Kemisha Levy for booking ${bookingNumber}.`
    default:
      return ''
  }
}

function StatusEditor({ draft, saving, error, onClose, onChange, onSave }) {
  if (!draft) {
    return null
  }

  const titleMap = {
    confirmed: 'Confirm booking',
    cancelled: 'Cancel booking',
    done: 'Mark booking done',
  }

  const helperMap = {
    confirmed:
      'Add a confirmation note for the user. It will be sent by email together with the booking details.',
    cancelled:
      'Add a cancellation reason. It will be sent by email so the user knows what happened.',
    done:
      'Add an optional thank-you note. If left blank, we will still send a simple thank-you email.',
  }

  const isNoteRequired = draft.status !== 'done'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-[#ede5dc] bg-white p-6 shadow-[0_24px_80px_rgba(10,22,40,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Booking action</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1c1612]">
              {titleMap[draft.status] || 'Update booking'}
            </h2>
            <p className="mt-2 text-sm text-[#5c5248]">
              Booking <span className="font-semibold">{draft.booking.booking_number || draft.booking.id}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#ede5dc] px-3 py-1 text-sm text-[#5c5248]"
          >
            Close
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-[#ede5dc] bg-[#fffcf8] p-4 text-sm text-[#5c5248]">
          {helperMap[draft.status] || 'Add a note for the user.'}
        </div>

        <label className="mt-5 grid gap-2 text-sm text-[#5c5248]">
          <span>Message or reason</span>
          <textarea
            value={draft.note}
            onChange={(event) => onChange(event.target.value)}
            rows="5"
            required={isNoteRequired}
            placeholder="Type the note that will be emailed to the user..."
            className="rounded-2xl border border-[#ede5dc] bg-[#fffcf8] px-4 py-3 text-[#1c1612] outline-none"
          />
        </label>

        {error ? <p className="mt-4 text-sm text-[#c4788e]">{error}</p> : null}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#ede5dc] px-5 py-3 text-sm font-semibold text-[#1c1612]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-[#2a1a3e] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? 'Saving...' : getActionLabel(draft.status)}
          </button>
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  const { bookings, loading, error, updateBookingStatus } = useBookings()
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [draft, setDraft] = useState(null)
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  const filteredBookings = bookings.filter((booking) => {
    const statusMatches = statusFilter === 'all' || booking.status === statusFilter

    const searchValue = searchQuery.trim().toLowerCase()
    if (!searchValue) {
      return statusMatches
    }

    const searchableText = [
      booking.booking_number,
      booking.full_name,
      booking.phone,
      booking.service,
      booking.preferred_date,
      booking.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return statusMatches && searchableText.includes(searchValue)
  })

  const openAction = (booking, status) => {
    setActionError('')
    setDraft({
      booking,
      status,
      note: getDefaultNote(status, booking),
    })
  }

  const closeAction = () => {
    if (saving) {
      return
    }

    setDraft(null)
    setActionError('')
  }

  const saveAction = async () => {
    if (!draft) {
      return
    }

    setSaving(true)
    setActionError('')

    const result = await updateBookingStatus(
      draft.booking.id,
      draft.status,
      draft.note.trim(),
    )

    setSaving(false)

    if (result.error) {
      setActionError(result.error.message || 'Could not update the booking.')
      return
    }

    setDraft(null)
  }

  return (
    <div className="space-y-10">
      <section className="rounded-4xl border border-[#ede5dc] bg-white p-10 shadow-[0_18px_50px_rgba(10,22,40,0.08)]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Admin dashboard</p>
            <h1 className="section-title">Manage booking requests</h1>
            <p className="section-subtitle text-[#5c5248]">
              Review new requests, search by booking number, update statuses, and keep the queue moving.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-[#5c5248]">
              Filter
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-[#ede5dc] bg-[#fffcf8] px-4 py-3 text-[#1c1612] outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option} className="text-[#1c1612]">
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-[#5c5248]">
              Search
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Booking number, name, phone..."
                className="rounded-2xl border border-[#ede5dc] bg-[#fffcf8] px-4 py-3 text-[#1c1612] outline-none"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-4xl border border-[#ede5dc] bg-white shadow-[0_18px_50px_rgba(10,22,40,0.08)]">
        {loading ? (
          <div className="p-8 text-[#5c5248]">Loading bookings...</div>
        ) : error ? (
          <div className="p-8 text-[#c4788e]">{error}</div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-[#5c5248]">No bookings found.</div>
        ) : (
          <table className="min-w-full divide-y divide-[#ede5dc] text-left text-sm">
            <thead className="bg-[#fffcf8] text-[#5c5248]">
              <tr>
                <th className="px-4 py-4 font-semibold">Booking #</th>
                <th className="px-4 py-4 font-semibold">Name</th>
                <th className="px-4 py-4 font-semibold">Contact</th>
                <th className="px-4 py-4 font-semibold">Service</th>
                <th className="px-4 py-4 font-semibold">Date & time</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede5dc] bg-white text-[#1c1612]">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-4 font-mono text-xs text-[#5c5248]">
                    {booking.booking_number || booking.id}
                  </td>
                  <td className="px-4 py-4">{booking.full_name}</td>
                  <td className="px-4 py-4 text-[#5c5248]">
                    <div>{booking.phone}</div>
                    <div className="text-xs text-[#9b8f84]">{booking.email || 'No email'}</div>
                  </td>
                  <td className="px-4 py-4 text-[#5c5248]">{booking.service}</td>
                  <td className="px-4 py-4 text-[#5c5248]">
                    <div>{booking.preferred_date}</div>
                    <div className="text-xs text-[#9b8f84]">{booking.preferred_time}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${getStatusClass(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </div>
                    {booking.status_note ? (
                      <p className="mt-2 max-w-xs text-xs text-[#8a7e71]">{booking.status_note}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {actionableStatuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => openAction(booking, status)}
                          className="rounded-full border border-[#ede5dc] bg-[#fffcf8] px-3 py-2 text-xs font-semibold text-[#1c1612] transition hover:border-[#d7c9ba]"
                        >
                          {getActionLabel(status)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <StatusEditor
        draft={draft}
        saving={saving}
        error={actionError}
        onClose={closeAction}
        onChange={(note) => setDraft((current) => (current ? { ...current, note } : current))}
        onSave={saveAction}
      />
    </div>
  )
}
