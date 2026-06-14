import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let isMounted = true

    const loadBookings = async () => {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

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
    if (!supabase) return

    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

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
    if (!supabase) {
      return { error: new Error('Supabase is not configured yet.') }
    }

    const result = await supabase.from('bookings').update({ status }).eq('id', id)

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
