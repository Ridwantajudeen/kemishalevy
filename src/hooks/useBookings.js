import { useEffect, useState } from 'react'
import { loadAdminBookings, updateAdminBookingStatus } from '../lib/adminBookings'

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadBookings = async () => {
      setLoading(true)
      const { data, error: fetchError } = await loadAdminBookings()

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError.message)
        setBookings([])
      } else {
        setError(null)
        setBookings(data ?? [])
      }

      setLoading(false)
    }

    loadBookings()

    return () => {
      isMounted = false
    }
  }, [])

  const refresh = async () => {
    setLoading(true)
    const { data, error: fetchError } = await loadAdminBookings()

    if (fetchError) {
      setError(fetchError.message)
      setBookings([])
    } else {
      setError(null)
      setBookings(data ?? [])
    }

    setLoading(false)
  }

  const updateBookingStatus = async (id, status) => {
    const result = await updateAdminBookingStatus(id, status)

    if (!result.error) {
      await refresh()
    }

    return result
  }

  return {
    bookings,
    loading,
    error,
    refresh,
    updateBookingStatus,
  }
}
