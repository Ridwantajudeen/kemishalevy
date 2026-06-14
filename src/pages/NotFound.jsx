import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b4f7a]">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2a1a3e]">
        This page does not exist.
      </h1>
      <p className="mt-4 text-[#675a72]">Let’s head back to the homepage.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-[#2a1a3e] px-6 py-3 text-sm font-semibold text-white"
      >
        Go home
      </Link>
    </section>
  )
}
