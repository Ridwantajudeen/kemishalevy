import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitBookingRequest } from '../lib/bookings';
import './notary.css';

const serviceOptions = [
  'General notary appointment',
  'Affidavit notarization',
  'Power of attorney',
  'Document witnessing',
  'Business paperwork',
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

const trustPills = [
  'Licensed notary services',
  'Flexible booking windows',
  'Fast appointment response',
];

const sidebarServices = [
  'General acknowledgements',
  'Affidavits and sworn statements',
  'Power of attorney documents',
  'Real estate and business forms',
  'Witnessing signatures',
];

const expectations = [
  'Complete the form with your contact details and preferred time.',
  'We confirm availability and send next-step instructions.',
  'Bring a valid ID and any documents that require signatures.',
];

export default function Notary() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitNotice, setSubmitNotice] = useState('');
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
    date: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const submitRequest = async () => {
    setSubmitError('');
    setSubmitNotice('');
    setIsSubmitting(true);

    try {
      const result = await submitBookingRequest({
        ...formData,
        preferredDate: formData.date,
        preferredTime: selectedTime,
      });

      if (result.error) {
        setSubmitError(result.error.message || 'We could not send your request right now.');
        return;
      }

      const confirmationResult = result.data?.notifications?.confirmation;
      if (confirmationResult && !confirmationResult.sent && !confirmationResult.skipped) {
        setSubmitNotice(
          `The booking saved, but the confirmation email did not send.${
            confirmationResult.details ? ` ${confirmationResult.details}` : ''
          }`,
        );
      }

      setSubmittedBooking(result.data?.booking ?? null);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: serviceOptions[0],
        date: '',
        notes: '',
      });
      setSelectedTime(timeSlots[1]);
    } catch {
      setSubmitError('We could not send your request right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await submitRequest();
  };

  return (
    <main id="top" className="appointment-page">
      <section className="appointment-hero">
        <div className="appointment-shell appointment-hero__grid">
          <div className="appointment-hero__copy">
            <p className="appointment-breadcrumb">
              <Link to="/">Home</Link> <span>/</span> Book appointment
            </p>
            <p className="appointment-kicker">Notary services</p>
            <h1>Book your appointment</h1>
            <p className="appointment-lead">
              Choose a time, share the documents you need notarized, and we will
              confirm the details quickly.
            </p>

            <div className="appointment-trust">
              {trustPills.map((pill) => (
                <span key={pill} className="appointment-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="appointment-hero__panel" aria-hidden="true">
            <span className="appointment-panel__badge">Available for same day bookings</span>
            <div className="appointment-emblem">KL</div>
            <div className="appointment-metrics">
              <div>
                <strong>10+</strong>
                <span>years of trusted service</span>
              </div>
              <div>
                <strong>2K+</strong>
                <span>documents completed</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>response window</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appointment-main">
        <div className="appointment-shell appointment-layout">
          <div className="appointment-form-card">
            {submitted ? (
              <div className="appointment-success">
                <p className="appointment-success__eyebrow">Request received</p>
                <h2>Your booking request is in</h2>
                {submittedBooking?.booking_number ? (
                  <p className="mt-3 font-semibold text-[#5c5248]">
                    Booking number: <span className="font-mono">{submittedBooking.booking_number}</span>
                  </p>
                ) : null}
                <p>
                  Thank you. We will review the information you sent and get back to
                  you as soon as possible with confirmation and next steps.
                </p>
                {submitNotice ? <p className="appointment-error">{submitNotice}</p> : null}
                <button
                  type="button"
                  className="appointment-button appointment-button--ghost"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form className="appointment-form" onSubmit={handleFormSubmit}>
                <div className="appointment-section-title">
                  <p>Step 1</p>
                  <h2>Your information</h2>
                </div>

                <div className="appointment-grid">
                  <label className="appointment-field">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label className="appointment-field">
                    <span>Email address</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </label>

                  <label className="appointment-field">
                    <span>Phone number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </label>

                  <label className="appointment-field">
                    <span>Service needed</span>
                    <select name="service" value={formData.service} onChange={handleChange}>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="appointment-section-title">
                  <p>Step 2</p>
                  <h2>Preferred schedule</h2>
                </div>

                <div className="appointment-grid appointment-grid--schedule">
                  <label className="appointment-field">
                    <span>Preferred date</span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <div className="appointment-time-group">
                    <span>Preferred time</span>
                    <div className="appointment-time-grid" role="list" aria-label="Preferred time">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`appointment-time-chip${selectedTime === slot ? ' is-active' : ''}`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="appointment-section-title">
                  <p>Step 3</p>
                  <h2>Anything else we should know?</h2>
                </div>

                {submitError ? <p className="appointment-error">{submitError}</p> : null}

                <label className="appointment-field appointment-field--textarea">
                  <span>Additional notes</span>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us about the documents, special timing needs, or any questions."
                    rows="5"
                  />
                </label>

                <div className="appointment-summary">
                  <div>
                    <strong>{formData.service}</strong>
                    <span>{formData.date || 'Choose a preferred date'}</span>
                  </div>
                  <div>
                    <strong>{selectedTime}</strong>
                    <span>Preferred time</span>
                  </div>
                </div>

                <button type="submit" className="appointment-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending request...' : 'Request appointment'}
                </button>
              </form>
            )}
          </div>

          <aside className="appointment-sidebar">
            <div className="appointment-sidebar__card">
              <p className="appointment-sidebar__eyebrow">Services</p>
              <h3>What we can help with</h3>
              <ul className="appointment-list">
                {sidebarServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            <div className="appointment-sidebar__card">
              <p className="appointment-sidebar__eyebrow">What to expect</p>
              <h3>Simple, clear, and quick</h3>
              <ol className="appointment-steps">
                {expectations.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="appointment-sidebar__card appointment-sidebar__card--accent">
              <p className="appointment-sidebar__eyebrow">Need help now?</p>
              <h3>Send the documents ahead of time</h3>
              <p>
                If you are unsure which service to choose, include a note in the form
                and we will guide you to the right appointment.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="appointment-cta">
        <div className="appointment-shell appointment-cta__inner">
          <div>
            <p className="appointment-kicker">Book with confidence</p>
            <h2>Secure your time slot and we will handle the rest.</h2>
          </div>
          <div className="appointment-cta__actions">
            <p>Bring a valid ID and any document copies that need notarization.</p>
            <a className="appointment-button appointment-button--ghost" href="#top">
              Back to top
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
