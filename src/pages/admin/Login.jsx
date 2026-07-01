import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Login() {
  const { signIn } = useAuth()
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
    <div className="mx-auto max-w-md rounded-4xl border border-[#ede5dc] bg-white p-10 shadow-[0_18px_50px_rgba(10,22,40,0.08)] text-[#1c1612]">
      <p className="section-kicker">Admin access</p>
      <div className="h-4" />

      <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
        <label className="grid gap-2 text-sm text-[#5c5248]">
          <span>Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-[#ede5dc] bg-[#fffcf8] px-4 py-3 text-[#1c1612] outline-none placeholder:text-[#8e8579]"
            placeholder="admin@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm text-[#5c5248]">
          <span>Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-2xl border border-[#ede5dc] bg-[#fffcf8] px-4 py-3 text-[#1c1612] outline-none placeholder:text-[#8e8579]"
            placeholder="••••••••"
          />
        </label>

        {message ? <p className="text-sm text-[#c4788e]">{message}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="nav-cta w-full text-center"
        >
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
