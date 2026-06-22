import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Login() {
  const { isConfigured, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from ?? '/admin/dashboard'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')

    const { error } = await signIn(email, password)

    if (error) {
      setMessage(error.message)
      setSubmitting(false)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">Login</p>
      <h2 className="mt-3 text-3xl font-semibold">Admin sign in</h2>
      <p className="mt-3 text-sm text-white/65">
        {isConfigured
          ? 'Use the admin email and password you created in Supabase to enter the dashboard.'
          : 'Add the Supabase env vars before trying to log in.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-white/70">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/30"
            placeholder="admin@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/70">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/30"
            placeholder="••••••••"
          />
        </label>

        {message ? <p className="text-sm text-[#ffb6c8]">{message}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f0b17] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
