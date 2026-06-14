import { Link } from 'react-router-dom'
import {
  books,
  externalLinks,
  heroStats,
  storyBullets,
  ventures,
  whatIDoCards,
} from '../lib/constants'

export function Home() {
  return (
    <div className="home-shell">
      <section className="hero-grid">
        <div className="hero-left">
          <p className="hero-eyebrow">Entrepreneur · Author · Notary · Mother</p>
          <h1 className="hero-name">
            Kemisha
            <br />
            <em>Levy</em>
          </h1>
          <div className="hero-divider" />
          <p className="hero-tagline">
            Building meaningful brands, inspiring women, and creating a legacy that matters, one
            dream at a time.
          </p>
          <div className="hero-actions">
            <Link to="/notary" className="btn-primary">
              Book a notary appointment
            </Link>
            <a href="#story" className="btn-ghost">
              Explore my story
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="availability-pill">
            <span className="tag-dot" />
            <span>Available for notary appointments</span>
          </div>

          <div className="hero-media-shell">
            <img
              src="/kemisha-hero.jpg"
              alt="Kemisha Levy portrait"
              className="hero-media-image"
            />
            <div className="hero-media-badge">
              <span>KL</span>
            </div>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div key={stat.value} className="stat">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="intro-grid">
        <div className="section-kicker">Who I am</div>
        <div className="intro-copy">
          Hi, I&apos;m Kemisha Levy, an entrepreneur, author, mother, and business leader
          passionate about helping families, inspiring women, and building brands that mean
          something. As the founder of The Little Bee Box and Kybos Baby Clothing, I create
          family-first offerings that support mothers and children in practical, thoughtful ways.
          Beyond business, I am a published author, content creator, and advocate for personal
          growth, using my own journey to encourage others to pursue their dreams, overcome
          challenges, and embrace who they are. Whether through my books, businesses, or online
          platforms, my mission is simple: to inspire, empower, and make a positive impact.
        </div>
      </section>

      <section id="content" className="services-section">
        <div className="section-header">
          <h2 className="section-title">
            What I <em>do</em>
          </h2>
          <p className="section-subtitle">Multiple lanes. One mission.</p>
        </div>

        <div className="services-grid">
          {whatIDoCards.map((card) => (
            <article key={card.title} className="service-card">
              <p className="service-eyebrow">{card.eyebrow}</p>
              <h3 className="service-title">{card.title}</h3>
              <p className="service-body">{card.body}</p>
              {card.href?.startsWith('http') ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="service-link"
                >
                  {card.cta} →
                </a>
              ) : (
                <Link to={card.href} className="service-link">
                  {card.cta} →
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="story-section">
        <div className="story-left">
          <p className="section-kicker section-kicker-dark">My story</p>
          <h2 className="story-title">
            Built on
            <br />
            <em>resilience</em>
          </h2>
          <div className="hero-divider hero-divider-dark" />
          <div className="story-copy">
            <p>
              My name is Kemisha Levy, and my story is one of resilience, determination, and
              purpose. I am a mother, entrepreneur, author, and business professional who believes
              that every challenge in life can become the foundation for something extraordinary.
            </p>
            <p>
              Growing up, life taught me powerful lessons about perseverance. Losing my father at
              a young age shaped much of who I am today. Writing became my refuge. Through
              journaling and storytelling, I found a voice that would later grow into a passion for
              authorship and helping others through my words.
            </p>
            <p>
              I have spent over a decade working in healthcare and dental administration, earned a
              master&apos;s degree in business administration, and built businesses that connect with
              real families. When the pandemic changed the world, I launched Kybos Baby Clothing,
              and those conversations with parents led to The Little Bee Box, a family-focused
              subscription and shopping support service designed to make life easier for moms,
              babies, and growing households.
            </p>
          </div>
          <Link to="/about" className="story-link">
            Read my full story →
          </Link>
        </div>

        <div className="story-right">
          <blockquote className="story-quote">
            "I want women, especially mothers, to know that they do not have to choose between
            their dreams and their families. They can build both."
          </blockquote>

          <div className="story-bullets">
            {storyBullets.map((item, index) => (
              <div key={item} className="story-bullet">
                <span className="pill-bar" data-tone={index % 2 === 0 ? 'gold' : 'blue'} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="books-section">
        <div className="section-header">
          <h2 className="section-title">
            My <em>books</em>
          </h2>
          <p className="section-subtitle">Words that encourage, heal, and empower.</p>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <article key={book.title} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={`${book.title} cover`} className="book-cover-image" />
              </div>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-desc">{book.description}</p>
              <div className="book-links">
                <a href={externalLinks.authorProfile} target="_blank" rel="noreferrer" className="book-btn book-btn-dark">
                  Author profile
                </a>
                <a href={externalLinks.authorProfile} target="_blank" rel="noreferrer" className="book-btn">
                  View more
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="books-profile-cta">
          <p className="books-profile-text">
            Want to see the published author profile and more writing work?
          </p>
          <a
            href={externalLinks.authorProfile}
            target="_blank"
            rel="noreferrer"
            className="book-btn book-btn-dark"
          >
            View author profile
          </a>
        </div>
      </section>

      <section id="ventures" className="ventures-section">
        <div className="section-header">
          <h2 className="section-title">
            My <em>ventures</em>
          </h2>
          <p className="section-subtitle">Brands built with purpose.</p>
        </div>

        <div className="venture-grid">
          {ventures.map((venture) => (
            <article
              key={venture.title}
              className={`venture-card${venture.image ? '' : ' venture-card--placeholder'}`}
              style={venture.image ? { '--venture-image': `url(${venture.image})` } : undefined}
            >
              <div className="venture-content">
                <div className="venture-copy">
                  <p className="venture-tag">{venture.tag}</p>
                  <h3 className="venture-title">{venture.title}</h3>
                  <p className="venture-body">{venture.body}</p>
                </div>

                <a href={venture.href} target="_blank" rel="noreferrer" className="venture-link">
                  {venture.cta} →
                </a>
              </div>

              {!venture.image && (
                <div className="venture-placeholder">
                  <p>{venture.imageAlt}</p>
                  <span>Add the file to public and it will appear here.</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="notary" className="cta-banner">
        <div className="cta-left">
          <p className="section-kicker section-kicker-dark">Notary services</p>
          <h2 className="cta-title">
            Need a document
            <br />
            <em>notarised?</em>
          </h2>
          <p className="cta-subtitle">
            Professional, certified notary services available for individuals and businesses.
            Affidavits, power of attorney, deeds, and more. Book your appointment today.
          </p>
        </div>

        <Link to="/notary" className="cta-button">
          Book an appointment
        </Link>
      </section>
    </div>
  )
}
