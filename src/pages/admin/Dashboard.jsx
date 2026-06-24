import { useState } from 'react'
import { useBookings } from '../../hooks/useBookings'

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled', 'done']

export function Dashboard() {
  const { bookings, loading, error, updateBookingStatus } = useBookings()
  const [statusFilter, setStatusFilter] = useState('all')

  const visibleBookings =
    statusFilter === 'all'
      ? bookings
      : bookings.filter((booking) => booking.status === statusFilter)

  return (
    <div className="space-y-10">
      <section className="rounded-4xl border border-[#ede5dc] bg-white p-10 shadow-[0_18px_50px_rgba(10,22,40,0.08)]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Admin dashboard</p>
            <h1 className="section-title">Manage booking requests</h1>
            <p className="section-subtitle text-[#5c5248]">
              Review new requests, update statuses, and keep the booking queue moving.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[auto_auto]">
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
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-4xl border border-[#ede5dc] bg-white shadow-[0_18px_50px_rgba(10,22,40,0.08)]">
        {loading ? (
          <div className="p-8 text-[#5c5248]">Loading bookings...</div>
        ) : error ? (
          <div className="p-8 text-[#c4788e]">{error}</div>
        ) : visibleBookings.length === 0 ? (
          <div className="p-8 text-[#5c5248]">No bookings yet.</div>
        ) : (
          <table className="min-w-full divide-y divide-[#ede5dc] text-left text-sm">
            <thead className="bg-[#fffcf8] text-[#5c5248]">
              <tr>
                <th className="px-4 py-4 font-semibold">Name</th>
                <th className="px-4 py-4 font-semibold">Contact</th>
                <th className="px-4 py-4 font-semibold">Service</th>
                <th className="px-4 py-4 font-semibold">Date & time</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ede5dc] bg-white text-[#1c1612]">
              {visibleBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-4">{booking.full_name}</td>
                  <td className="px-4 py-4 text-[#5c5248]">{booking.phone}</td>
                  <td className="px-4 py-4 text-[#5c5248]">{booking.service}</td>
                  <td className="px-4 py-4 text-[#5c5248]">
                    <div>{booking.preferred_date}</div>
                    <div className="text-xs text-[#9b8f84]">{booking.preferred_time}</div>
                  </td>
                  <td className="px-4 py-4 text-[#5c5248]">{booking.status}</td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue={booking.status}
                      onChange={(event) =>
                        updateBookingStatus(booking.id, event.target.value)
                      }
                      className="rounded-xl border border-[#ede5dc] bg-white px-3 py-2 text-[#1c1612] outline-none"
                    >
                      {['pending', 'confirmed', 'cancelled', 'done'].map((status) => (
                        <option key={status} value={status} className="text-[#1c1612]">
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
