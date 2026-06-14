import { books, externalLinks } from '../lib/constants'

export function Portfolio() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b4f7a]">
          Portfolio
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2a1a3e]">
          Writing and books.
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {books.map((book) => (
            <article
              key={book.title}
              className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6"
            >
              <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#f3e9ef] p-4 text-center">
                <img
                  src={book.cover}
                  alt={`${book.title} cover`}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-[#2a1a3e]">{book.title}</h2>
              <p className="mt-2 text-sm text-[#675a72]">{book.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href={externalLinks.authorProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#2a1a3e] px-4 py-2 text-white"
                >
                  Read author profile
                </a>
                <a
                  href={externalLinks.authorProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#d8c6d1] px-4 py-2 text-[#2a1a3e]"
                >
                  More writing
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="books-profile-cta">
          <p className="books-profile-text">
            The full author profile includes more published work and writing details.
          </p>
          <a
            href={externalLinks.authorProfile}
            target="_blank"
            rel="noreferrer"
            className="book-btn book-btn-dark"
          >
            Open profile
          </a>
        </div>
      </div>
    </section>
  )
}
