import { useEffect, useState, type FormEvent } from 'react'
import { db, firebaseEnabled } from '../lib/firebase'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import './Guestbook.css'

interface Wish {
  name: string
  message: string
  at: string
}

const STORAGE_KEY = 'wedding-guestbook'

const seed: Wish[] = [
  {
    name: 'The Revival Hub Family',
    message: 'What God has joined together! We rejoice with you both. May your home overflow with His glory. 🕊️',
    at: '2026-05-20T10:00:00.000Z',
  },
  {
    name: 'Aunty Grace',
    message: 'Congratulations Purity & Isaiah! Wishing you a lifetime of love, laughter and answered prayers. ❤️',
    at: '2026-05-22T14:30:00.000Z',
  },
]

function loadLocal(): Wish[] {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(stored)) return stored
  } catch {
    /* ignore */
  }
  return seed
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const day = 86_400_000
  if (diff < 3_600_000) return 'just now'
  if (diff < day) return `${Math.floor(diff / 3_600_000)}h ago`
  if (diff < day * 30) return `${Math.floor(diff / day)}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const palette = ['#bfa05a', '#6e1423', '#7a6f57', '#9c813f', '#4a5d4e', '#8a5a44']

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>(() => (firebaseEnabled ? [] : loadLocal()))
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  // Live wall from Firebase (shared across everyone) when connected…
  useEffect(() => {
    if (!firebaseEnabled || !db) return
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (snap) => {
      setWishes(
        snap.docs.map((d) => {
          const data = d.data() as { name: string; message: string; at?: string }
          return { name: data.name, message: data.message, at: data.at || '' }
        }),
      )
    })
  }, [])

  // …otherwise keep the local browser copy in sync.
  useEffect(() => {
    if (firebaseEnabled) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes))
    } catch {
      /* ignore */
    }
  }, [wishes])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Please add both your name and a message.')
      return
    }
    setError('')
    const wish: Wish = {
      name: name.trim(),
      message: message.trim(),
      at: new Date().toISOString(),
    }

    if (firebaseEnabled && db) {
      setSending(true)
      try {
        await addDoc(collection(db, 'guestbook'), { ...wish, createdAt: serverTimestamp() })
      } catch {
        setError('Sorry, your message couldn’t be posted. Please try again.')
        setSending(false)
        return
      }
      setSending(false)
      // The live subscription will add it to the wall automatically.
    } else {
      setWishes((prev) => [wish, ...prev])
    }

    setName('')
    setMessage('')
  }

  return (
    <section id="guestbook" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Leave Your Mark</span>
          <h2>Guestbook &amp; Well-Wishes</h2>
          <p className="sub">Share a prayer, a blessing or a memory for the couple.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <form className="guestbook__form reveal" onSubmit={submit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            aria-label="Your name"
          />
          <textarea
            placeholder="Write your message for Purity & Isaiah…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={400}
            aria-label="Your message"
          />
          {error && <span className="guestbook__error">{error}</span>}
          <button type="submit" className="btn" disabled={sending}>
            {sending ? 'Posting…' : 'Post Your Wish'}
          </button>
        </form>

        <div className="guestbook__wall">
          {wishes.map((w, i) => (
            <article className="wish" key={`${w.at}-${i}`}>
              <div className="wish__head">
                <span
                  className="wish__avatar"
                  style={{ background: palette[i % palette.length] }}
                  aria-hidden="true"
                >
                  {w.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <strong className="wish__name">{w.name}</strong>
                  <span className="wish__time">{w.at ? timeAgo(w.at) : ''}</span>
                </div>
              </div>
              <p className="wish__msg">{w.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
