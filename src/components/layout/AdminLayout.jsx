import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Footer } from './Footer'

export function AdminLayout() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    const { error } = await signOut()
    if (error) {
      console.error('Admin logout failed', error)
    }

    window.location.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#fffcf8] text-[#1c1612]">
      <header className="site-nav sticky top-0 z-30">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            Kemisha <span>Levy</span>
          </Link>

          <div className="nav-actions gap-4">
            <Link to="/admin/dashboard" className="nav-link">
              Dashboard
            </Link>
            {session ? (
              <button type="button" onClick={onLogout} className="nav-cta">
                Logout
              </button>
            ) : (
              <Link to="/admin/login" className="nav-cta">
                Admin login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
