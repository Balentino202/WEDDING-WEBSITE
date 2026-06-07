import { useState, type FormEvent } from 'react'
import { couple, rsvpEndpoint } from '../data/wedding'
import { db, firebaseEnabled } from '../lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import './RSVP.css'

type Attendance = 'pending' | 'yes' | 'no' | 'maybe'

interface FormState {
  name: string
  email: string
  attending: Attendance
  guests: string
  events: string[]
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  attending: 'pending',
  guests: '1',
  events: [],
  message: '',
}

const attendanceOptions: { value: Attendance; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' },
]

const eventOptions = ['Traditional Ceremony', 'White Wedding', 'Reception']

export default function RSVP() {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleEvent = (ev: string) =>
    setForm((f) => ({
      ...f,
      events: f.events.includes(ev) ? f.events.filter((e) => e !== ev) : [...f.events, ev],
    }))

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'A valid email is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      ...form,
      events: form.events.join(', '),
      submittedAt: new Date().toISOString(),
      _subject: `Wedding RSVP — ${form.name}`,
    }

    // Always keep a local copy so nothing is ever lost.
    try {
      const key = 'wedding-rsvps'
      const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
      existing.push(payload)
      window.localStorage.setItem(key, JSON.stringify(existing))
    } catch {
      /* ignore storage errors */
    }

    // Save to the shared Firestore guest list so the couple can see it from
    // anywhere on the password-protected /admin page.
    if (firebaseEnabled && db) {
      setSending(true)
      setSendError('')
      try {
        await addDoc(collection(db, 'rsvps'), {
          name: form.name.trim(),
          email: form.email.trim(),
          attending: form.attending,
          guests: form.attending === 'yes' || form.attending === 'maybe' ? form.guests : '—',
          events: form.events.join(', '),
          message: form.message.trim(),
          submittedAt: payload.submittedAt,
          createdAt: serverTimestamp(),
        })
      } catch {
        setSending(false)
        setSendError(
          'We couldn’t reach the server, but your response was saved. Please try again later.',
        )
        return
      }
      setSending(false)
    }

    // If a Formspree endpoint is configured, send it there too.
    if (rsvpEndpoint) {
      setSending(true)
      setSendError('')
      try {
        const res = await fetch(rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      } catch {
        setSending(false)
        setSendError(
          'We couldn’t reach the server, but your response was saved. Please try again later.',
        )
        return
      }
      setSending(false)
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="section section--tint">
        <div className="container rsvp__thanks">
          <div className="rsvp__thanks-icon">💌</div>
          <h2>Thank You, {form.name.split(' ')[0]}!</h2>
          <p>
            {form.attending === 'yes'
              ? `We're overjoyed that you'll be celebrating with us. See you in August!`
              : form.attending === 'maybe'
                ? `We hope you'll be able to make it! Thank you for letting us know.`
                : form.attending === 'no'
                  ? `We'll miss you, but thank you for letting us know. You'll be in our hearts.`
                  : `Thank you for your response. We hope to celebrate with you in August!`}
          </p>
          <p className="rsvp__hashtag">{couple.hashtag}</p>
          <button
            className="btn btn--ghost"
            onClick={() => {
              setForm(initial)
              setSubmitted(false)
            }}
          >
            Submit Another Response
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Will You Join Us?</span>
          <h2>RSVP</h2>
          <p className="sub">Kindly respond before June 30th, 2026 so we can plan accordingly.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <form className="rsvp__form reveal" onSubmit={handleSubmit} noValidate>
          <div className="rsvp__field">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={errors.name ? 'has-error' : ''}
              placeholder="Your name"
            />
            {errors.name && <span className="rsvp__error">{errors.name}</span>}
          </div>

          <div className="rsvp__field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={errors.email ? 'has-error' : ''}
              placeholder="you@example.com"
            />
            {errors.email && <span className="rsvp__error">{errors.email}</span>}
          </div>

          <div className="rsvp__field">
            <label htmlFor="attending">Will you attend?</label>
            <select
              id="attending"
              value={form.attending}
              onChange={(e) => update('attending', e.target.value as Attendance)}
            >
              {attendanceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {(form.attending === 'yes' || form.attending === 'maybe') && (
            <>
              <div className="rsvp__field">
                <label htmlFor="guests">Number of Guests (including you)</label>
                <select id="guests" value={form.guests} onChange={(e) => update('guests', e.target.value)}>
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rsvp__field">
                <span className="rsvp__legend">Which events will you attend?</span>
                <div className="rsvp__checks">
                  {eventOptions.map((ev) => (
                    <label key={ev} className={`rsvp__check${form.events.includes(ev) ? ' is-selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={form.events.includes(ev)}
                        onChange={() => toggleEvent(ev)}
                      />
                      {ev}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="rsvp__field">
            <label htmlFor="message">A Message for the Couple</label>
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="Share your wishes, prayers or blessings…"
            />
          </div>

          {sendError && <p className="rsvp__senderror">{sendError}</p>}

          <button type="submit" className="btn rsvp__submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      </div>
    </section>
  )
}
