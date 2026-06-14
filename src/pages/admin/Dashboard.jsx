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
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
              Bookings
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Manage appointment requests</h2>
          </div>

          <label className="grid gap-2 text-sm text-white/70">
            Filter
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option === 'all' ? 'All' : option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        {loading ? (
          <div className="p-8 text-white/70">Loading bookings...</div>
        ) : error ? (
          <div className="p-8 text-[#ffb6c8]">{error}</div>
        ) : visibleBookings.length === 0 ? (
          <div className="p-8 text-white/70">No bookings yet.</div>
        ) : (
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {visibleBookings.map((booking) => (
                <tr key={booking.id} className="bg-white/0">
                  <td className="px-4 py-4 text-white">{booking.full_name}</td>
                  <td className="px-4 py-4 text-white/75">{booking.phone}</td>
                  <td className="px-4 py-4 text-white/75">{booking.service}</td>
                  <td className="px-4 py-4 text-white/75">{booking.preferred_date}</td>
                  <td className="px-4 py-4 text-white/75">{booking.status}</td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue={booking.status}
                      onChange={(event) =>
                        updateBookingStatus(booking.id, event.target.value)
                      }
                      className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white outline-none"
                    >
                      {['pending', 'confirmed', 'cancelled', 'done'].map((status) => (
                        <option key={status} value={status} className="text-black">
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
      </div>
    </div>
  )
}
