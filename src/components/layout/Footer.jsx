import { Link } from 'react-router-dom'
import { externalLinks, navLinks, ventures } from '../../lib/constants'

const renderLink = (link) => {
  if (link.to) {
    return (
      <Link key={link.label} to={link.to} className="footer-link">
        {link.label}
      </Link>
    )
  }

  return (
    <a key={link.label} href={link.href} className="footer-link">
      {link.label}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            Kemisha <span>Levy</span>
          </div>
          <p className="footer-tagline">
            Entrepreneur. Author. Notary.
            <br />
            Building what matters.
          </p>
        </div>
        <div>
          <div className="footer-heading">Navigate</div>
          <div className="footer-links">
            {navLinks.map(renderLink)}
          </div>
        </div>
        <div>
          <div className="footer-heading">Ventures</div>
          <div className="footer-links">
            {ventures.map((venture) => (
              <a key={venture.title} href={venture.href} target="_blank" rel="noreferrer" className="footer-link">
                {venture.title}
              </a>
            ))}
            <a href={externalLinks.quietSpaceApp} target="_blank" rel="noreferrer" className="footer-link">
              The Quiet Space App
            </a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Connect</div>
          <div className="footer-links">
            <a href={externalLinks.authorProfile} target="_blank" rel="noreferrer" className="footer-link">
              Author profile
            </a>
            <a href={externalLinks.youtube} target="_blank" rel="noreferrer" className="footer-link">
              YouTube
            </a>
            <a href={externalLinks.instagram} target="_blank" rel="noreferrer" className="footer-link">
              Instagram
            </a>
            <a href={externalLinks.tiktok} target="_blank" rel="noreferrer" className="footer-link">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Kemisha Levy. All rights reserved.</p>
        <p className="footer-copy">Designed with purpose.</p>
      </div>
    </footer>
  )
}
