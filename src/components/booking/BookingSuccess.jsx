export function BookingSuccess({ booking }) {
  const displayName = booking.fullName || booking.full_name || 'there'
  const confirmationResult = booking.notifications?.confirmation
  const confirmationFailed =
    confirmationResult && !confirmationResult.sent && !confirmationResult.skipped

  return (
    <div className="rounded-3xl border border-[#d6c7d0] bg-white/85 p-6 shadow-[0_18px_60px_rgba(42,26,62,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9b4f7a]">
        Request received
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-[#2a1a3e]">
        Thanks, {displayName}. Your booking request has been sent.
      </h3>
      {booking.booking_number ? (
        <p className="mt-3 text-sm font-semibold text-[#5c5248]">
          Booking number: <span className="font-mono">{booking.booking_number}</span>
        </p>
      ) : null}
      <p className="mt-3 max-w-2xl text-sm text-[#675a72]">
        We&apos;ve captured the request and will use it to coordinate the next steps with you.
      </p>
      {confirmationFailed ? (
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          The booking saved, but the confirmation email did not send.
          {confirmationResult.details ? ` ${confirmationResult.details}` : ''}
        </p>
      ) : null}
    </div>
  )
}
