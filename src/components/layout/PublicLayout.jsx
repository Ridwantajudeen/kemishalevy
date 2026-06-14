import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function PublicLayout() {
  const location = useLocation()
  const showFooter = location.pathname !== '/about'

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  )
}
