import { externalLinks } from '../lib/constants'

export function Shop() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b4f7a]">Shop</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2a1a3e]">
          Baby clothing showcase.
        </h1>
        <p className="mt-4 max-w-2xl text-[#675a72]">
          A thin page that introduces the brand and sends visitors to the external store.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="aspect-[4/5] rounded-[1.5rem] bg-[#f1e4ea]" />
          <div className="aspect-[4/5] rounded-[1.5rem] bg-[#eadfd1]" />
          <div className="aspect-[4/5] rounded-[1.5rem] bg-[#e9ecef]" />
        </div>

        <a
          href={externalLinks.kybosBabyClothing}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-[#9b4f7a] px-6 py-3 text-sm font-semibold text-white"
        >
          Shop now
        </a>
      </div>
    </section>
  )
}
