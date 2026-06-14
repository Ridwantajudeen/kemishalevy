import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../lib/constants'

function NavItem({ link, className, onClick }) {
  const location = useLocation()
  const isActive = link.to && location.pathname === link.to

  if (link.to) {
    return (
      <Link
        to={link.to}
        className={`${className} ${isActive ? 'nav-link--active' : ''}`}
        onClick={onClick}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <a href={link.href} className={className} onClick={onClick}>
      {link.label}
    </a>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-nav sticky top-0 z-30">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          Kemisha <span>Levy</span>
        </Link>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavItem key={link.label} link={link} className="nav-link" />
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/notary" className="nav-cta">
            Book appointment
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-panel ${isMenuOpen ? 'is-open' : ''}`}>
        {navLinks.map((link) => (
          <NavItem
            key={link.label}
            link={link}
            className="nav-mobile-link"
            onClick={() => setIsMenuOpen(false)}
          />
        ))}
      </div>
    </header>
  )
}
