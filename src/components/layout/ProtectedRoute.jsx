import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute() {
  const { loading, session } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl rounded-4xl border border-[#d6c7d0] bg-white/85 p-8 text-[#2a1a3e] shadow-[0_18px_60px_rgba(42,26,62,0.08)]">
        Checking admin session...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
