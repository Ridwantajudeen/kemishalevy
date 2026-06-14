import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { externalLinks } from '../lib/constants'

const chapters = [
  {
    num: '01',
    title: 'The beginning',
    heading: 'Where it all started',
    paragraphs: [
      'Growing up, life taught me powerful lessons about perseverance before I even knew what that word meant. Losing my father at a young age was one of the most defining moments of my life. It shaped my strength, my independence, and my deep understanding of the importance of finding healthy ways to process emotions.',
      'Writing became my refuge. Through journaling and storytelling, I found a voice that felt entirely mine. What started as a way to cope quietly became a passion, and that passion would eventually grow into a career as a published author dedicated to helping others through words.',
    ],
  },
  {
    num: '02',
    title: 'The career',
    heading: 'A decade of leadership',
    paragraphs: [
      'Professionally, I spent over a decade working in healthcare and dental administration, building leadership, management, and operational skills that would later prove invaluable when it came time to build my own organisations. I learned how systems work, how people work, and how to lead with both efficiency and empathy.',
      'Alongside my career, I pursued higher education with serious intent. Earning a master&apos;s degree in business administration was not just an academic achievement; it was a declaration of the kind of leader I wanted to become. It deepened my understanding of strategy, operations, and the mechanics of building businesses that last.',
    ],
  },
  {
    num: '03',
    title: 'The pivot',
    heading: 'When the world stopped',
    paragraphs: [
      'When the COVID-19 pandemic changed everything, it also changed me. Like so many people, I was forced to sit still and ask hard questions about what I truly wanted to build with my life. The answer came in the form of Kybos Baby Clothing, launched during that uncertain season with a desire to provide quality baby apparel and connect with families navigating something no one had a roadmap for.',
      'Building Kybos gave me something I did not expect: conversation. Parents shared their experiences, their exhaustion, their needs. Mothers told me what they wished someone would do for them. Those conversations planted a seed. If clothing could bring families a moment of joy, what else could be possible?',
    ],
  },
  {
    num: '04',
    title: 'The vision',
    heading: 'Building something lasting',
    paragraphs: [
      "From the conversations that came out of Kybos, The Little Bee Box was born. A family-focused subscription and shopping support service thoughtfully designed to bring joy, convenience, and genuine care to households. Every box is curated with essentials for babies and thoughtful items for moms, because I believe mothers deserve to feel valued and seen, not just productive.",
      "More than a business, The Little Bee Box represents my commitment to community. It is a place where families feel supported, empowered, and part of something bigger. That sense of togetherness, of not doing it alone, is something I wish I had more of in my own early years of motherhood.",
    ],
  },
]

const timeline = [
  {
    year: 'Early',
    title: 'Found her voice through writing',
    body: 'After losing her father at a young age, journaling became a way to process and heal. The first seed of a future author was planted.',
  },
  {
    year: 'Career',
    title: '10+ years in healthcare and dental administration',
    body: 'Built a career managing teams and operations in clinical settings, developing the leadership skills that would later anchor her businesses.',
  },
  {
    year: 'MBA',
    title: 'Master&apos;s degree in business administration',
    body: 'Pursued higher education alongside a full career and motherhood. A commitment to growing in every direction at once.',
  },
  {
    year: '2020',
    title: 'Launched Kybos Baby Clothing',
    body: 'During the pandemic, turned a moment of disruption into an act of creation. Kybos was born to bring families quality and comfort during uncertain times.',
  },
  {
    year: 'After',
    title: 'Founded The Little Bee Box',
    body: 'Inspired by conversations with parents, created a family-first subscription and support service that helps moms shop with less stress and more care.',
  },
  {
    year: 'Now',
    title: 'Author, notary, creator, and mentor',
    body: 'Published books. Certified notary practice. YouTube channel. The Quiet Space app. And a son who is becoming an author and entrepreneur in his own right.',
  },
  {
    year: 'Next',
    title: 'Still building',
    body: 'One step, one dream, and one opportunity at a time.',
  },
]

const values = [
  {
    num: '01',
    title: 'Resilience',
    body: 'Every challenge is a foundation. Not a detour, not a setback, but raw material for something extraordinary. She has lived this truth and built from it.',
  },
  {
    num: '02',
    title: 'Empowerment',
    body: 'Women, especially mothers, can build their dreams without abandoning their families. She believes this fully, because she is doing it, and she wants every woman reading this to believe it too.',
  },
  {
    num: '03',
    title: 'Purpose',
    body: 'Business is not just commerce. Writing is not just words. Every venture, every book, every piece of content exists to make a positive impact on the lives of real people.',
  },
]

export function About() {
  return (
    <div className="about-page">
      <section className="about-page-header">
        <div className="about-page-header-left">
          <p className="about-page-breadcrumb">
            <Link to="/" className="about-page-breadcrumb-link">
              Home
            </Link>{' '}
            / <span>About</span>
          </p>
          <h1 className="about-page-title">
            The
            <br />
            story
            <br />
            of <em>Kemisha</em>
          </h1>
          <div className="about-page-line" />
        </div>

        <div className="about-page-header-right">
          <p className="about-page-intro">
            My story is one of <strong>resilience, determination, and purpose.</strong> Not a
            straight line from A to B, but a real journey shaped by loss, growth, and an
            unshakeable belief that every challenge can become the foundation for something
            extraordinary.
          </p>
        </div>
      </section>

      <section className="about-story">
        {chapters.map((chapter) => (
          <article key={chapter.num} className="about-chapter">
            <div className="about-chapter-label">
              <div className="about-chapter-num">{chapter.num}</div>
              <div className="about-chapter-title">{chapter.title}</div>
              <div className="about-chapter-dot" />
            </div>
            <div className="about-chapter-body">
              <h2 className="about-chapter-heading">
                {chapter.heading.split(' ').slice(0, -1).join(' ')}{' '}
                <em>{chapter.heading.split(' ').slice(-1)}</em>
              </h2>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-chapter-text">
                  {paragraph}
                </p>
              ))}
              {chapter.num === '01' ? (
                <div className="about-inline-quote">
                  <p className="about-inline-quote-text">
                    “Writing became my refuge. Through journaling and storytelling, I found a voice
                    that felt entirely mine.”
                  </p>
                  <p className="about-inline-quote-note">
                    This is the thread that runs through everything she has built since. The belief
                    that words, honesty, and vulnerability have the power to change lives.
                  </p>
                </div>
              ) : null}
              {chapter.num === '03' ? (
                <div className="about-inline-quote">
                  <p className="about-inline-quote-text">
                    “I want women, especially mothers, to know that they do not have to choose
                    between their dreams and their families. They can build both.”
                  </p>
                  <p className="about-inline-quote-note">
                    This belief is at the heart of every venture she has built. Not the idea of
                    balance, but the reality of integration, dreams and family, growing together.
                  </p>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="about-timeline">
        <div className="section-header about-section-header">
          <h2 className="section-title">
            The <em>journey</em>
          </h2>
          <p className="section-subtitle">Key milestones, in her own words.</p>
        </div>

        <div className="about-timeline-list">
          {timeline.map((item) => (
            <article key={item.title} className="about-timeline-item">
              <div className="about-timeline-year">{item.year}</div>
              <div className="about-timeline-track">
                <div className="about-timeline-dot" />
                <div className="about-timeline-line" />
              </div>
              <div className="about-timeline-content">
                <h3 className="about-timeline-title">{item.title}</h3>
                <p className="about-timeline-body">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-values">
        <div className="section-header about-section-header">
          <h2 className="section-title">
            What she <em>believes</em>
          </h2>
          <p className="section-subtitle">The principles behind everything she builds.</p>
        </div>

        <div className="about-values-grid">
          {values.map((value) => (
            <article key={value.title} className="about-value-card">
              <div className="about-value-num">{value.num}</div>
              <h3 className="about-value-title">{value.title}</h3>
              <p className="about-value-body">{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-son">
        <div className="about-son-left">
          <p className="about-page-breadcrumb">Beyond business</p>
          <h2 className="about-son-title">
            Raising the
            <br />
            next <em>generation</em>
          </h2>
          <div className="about-page-line" />
          <p className="about-son-text">
            One of Kemisha&apos;s proudest accomplishments is not a business milestone or a book
            deal. It is watching her son become a young author and entrepreneur in his own right.
            Together, they have worked on creative projects that teach children to dream big,
            believe in themselves, and understand that age should never be a limit on what they can
            achieve.
          </p>
          <p className="about-son-text">
            This is legacy in its most personal form. Not something she is building alone, but
            something they are building together.
          </p>
        </div>

        <div className="about-son-right">
          <p className="about-son-card-label">A note on legacy</p>
          <h3 className="about-son-card-title">
            “Watching him become a young author has been one of my proudest accomplishments.”
          </h3>
          <p className="about-son-card-body">
            She and her son have collaborated on projects designed to inspire children to pursue
            creativity and entrepreneurship because the lessons she learned about resilience and
            purpose deserve to be passed on.
          </p>
          <Link to="/#books" className="about-son-card-link">
            See our books →
          </Link>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-mission-label">Today</div>
        <div className="about-mission-right">
          <h2 className="about-mission-title">
            One mission,
            <br />
            many <em>expressions</em>
          </h2>
          <p className="about-mission-text">
            Today, Kemisha&apos;s work spans businesses, books, a notary practice, content
            creation, and mentorship. The forms change but the mission stays the same: to inspire
            people to believe in themselves and pursue the life they envision.
          </p>
          <p className="about-mission-text">
            This website is a home for all of it. A place where entrepreneurship meets motherhood,
            creativity meets strategy, and passion becomes impact. Thank you for being part of the
            story.
          </p>
          <div className="about-mission-btns">
            <Link to="/notary" className="btn-primary">
              Book a notary appointment
            </Link>
            <Link to="/#books" className="btn-ghost about-mission-ghost">
              Explore my work
            </Link>
            <a
              href={externalLinks.authorProfile}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost about-mission-ghost"
            >
              Author profile
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
