import { useEffect, useState } from 'react'
import { hasSupabaseConfig, supabase } from '../lib/supabase'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let isMounted = true

    const syncSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) return

      if (error) {
        setSession(null)
      } else {
        setSession(data.session ?? null)
      }
      setLoading(false)
    }

    syncSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase is not configured yet.') }
    }

    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    if (!supabase) return { error: null }
    return supabase.auth.signOut()
  }

  return {
    session,
    user: session?.user ?? null,
    loading,
    isConfigured: hasSupabaseConfig,
    signIn,
    signOut,
  }
}
