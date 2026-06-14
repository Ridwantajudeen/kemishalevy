import { externalLinks } from '../lib/constants'

export function Content() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b4f7a]">
          Content
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2a1a3e]">
          YouTube and social media hub.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6">
            <h2 className="text-2xl font-semibold text-[#2a1a3e]">Video highlights</h2>
            <p className="mt-2 text-[#675a72]">
              Her YouTube channel, Instagram, and TikTok can all live here as the media hub.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={externalLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="book-btn book-btn-dark"
              >
                YouTube
              </a>
              <a
                href={externalLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="book-btn"
              >
                Instagram
              </a>
              <a
                href={externalLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="book-btn"
              >
                TikTok
              </a>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6">
            <h2 className="text-2xl font-semibold text-[#2a1a3e]">Optional blog</h2>
            <p className="mt-2 text-[#675a72]">
              This section is ready for future Supabase posts if she wants to publish directly
              from the admin dashboard. We can also use it to feature author updates and content
              highlights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
