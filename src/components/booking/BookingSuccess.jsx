export function BookingSuccess({ booking }) {
  return (
    <div className="rounded-3xl border border-[#d6c7d0] bg-white/85 p-6 shadow-[0_18px_60px_rgba(42,26,62,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b4f7a]">
        Request received
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-[#2a1a3e]">
        Thanks, {booking.fullName}. Your booking form is ready.
      </h3>
      <p className="mt-3 max-w-2xl text-sm text-[#675a72]">
        This skeleton currently confirms the flow locally. In the next stage, we’ll connect it to
        Supabase, Resend, and WhatsApp alerts.
      </p>
    </div>
  )
}
