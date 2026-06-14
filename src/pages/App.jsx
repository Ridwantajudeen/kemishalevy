import { externalLinks } from '../lib/constants'

export function AppPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b4f7a]">App</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2a1a3e]">
          The Quiet Space.
        </h1>
        <p className="mt-4 max-w-2xl text-[#675a72]">
          Screenshots, feature highlights, and store links will live here. This page is ready for
          the app story when we need it.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6">
            <h2 className="text-2xl font-semibold text-[#2a1a3e]">Features</h2>
            <ul className="mt-4 space-y-3 text-[#675a72]">
              <li>Calm, focused experiences</li>
              <li>Download links for iOS and Android</li>
              <li>Simple brand-led presentation</li>
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-black/5 bg-white/80 p-6">
            <h2 className="text-2xl font-semibold text-[#2a1a3e]">Preview</h2>
            <div className="mt-4 aspect-[4/3] rounded-[1.25rem] bg-[#efe4d5]" />
            <a
              href={externalLinks.quietSpaceApp}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-[#9b4f7a] px-6 py-3 text-sm font-semibold text-white"
            >
              Open in App Store
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
