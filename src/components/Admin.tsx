import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { auth, db, firebaseEnabled } from '../lib/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { couple } from '../data/wedding'
import './Admin.css'

interface Rsvp {
  id: string
  name: string
  email: string
  attending: string
  guests: string
  events: string
  message: string
  submittedAt: string
}

interface Wish {
  id: string
  name: string
  message: string
  at: string
}

type Filter = 'all' | 'yes' | 'no' | 'maybe' | 'pending' | 'followup'
type Tab = 'rsvps' | 'wishes'
type SortKey = 'name' | 'date' | 'guests'

const filterLabels: Record<Filter, string> = {
  all: 'All',
  yes: 'Yes',
  maybe: 'Maybe',
  no: 'No',
  pending: 'Pending',
  followup: '🔔 Needs follow-up',
}

const attendBadge: Record<string, string> = {
  yes: 'is-yes',
  no: 'is-no',
  maybe: 'is-maybe',
  pending: 'is-pending',
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [signingIn, setSigningIn] = useState(false)

  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [tab, setTab] = useState<Tab>('rsvps')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [synced, setSynced] = useState(false)

  // Track whether someone is logged in.
  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setChecking(false)
      return
    }
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setChecking(false)
    })
  }, [])

  // Live-subscribe to the guest list while logged in.
  useEffect(() => {
    if (!user || !db) return
    setLoading(true)
    const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'))
    return onSnapshot(
      q,
      (snap) => {
        setRsvps(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Rsvp, 'id'>) })),
        )
        setLoading(false)
        setSynced(true)
      },
      () => setLoading(false),
    )
  }, [user])

  // Live-subscribe to the guestbook well-wishes while logged in.
  useEffect(() => {
    if (!user || !db) return
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (snap) => {
      setWishes(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Wish, 'id'>) })))
    })
  }, [user])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!auth) return
    setSigningIn(true)
    setLoginError('')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch {
      setLoginError('Incorrect email or password.')
    }
    setSigningIn(false)
  }

  const stats = useMemo(() => {
    const s = { total: rsvps.length, yes: 0, no: 0, maybe: 0, pending: 0, headcount: 0 }
    for (const r of rsvps) {
      if (r.attending === 'yes') s.yes++
      else if (r.attending === 'no') s.no++
      else if (r.attending === 'maybe') s.maybe++
      else s.pending++
      if (r.attending === 'yes' || r.attending === 'maybe') {
        const n = parseInt(r.guests, 10)
        s.headcount += Number.isNaN(n) ? 1 : n
      }
    }
    return s
  }, [rsvps])

  const eventCounts = useMemo(() => {
    const c: Record<string, number> = {
      'Traditional Ceremony': 0,
      'White Wedding': 0,
      Reception: 0,
    }
    for (const r of rsvps) {
      if (r.attending !== 'yes' && r.attending !== 'maybe') continue
      for (const key of Object.keys(c)) {
        if (r.events?.includes(key)) c[key]++
      }
    }
    return c
  }, [rsvps])

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    const rows = rsvps.filter((r) => {
      if (filter === 'followup') {
        if (r.attending !== 'pending' && r.attending !== 'maybe') return false
      } else if (filter !== 'all' && r.attending !== filter) {
        return false
      }
      if (!term) return true
      return (
        r.name?.toLowerCase().includes(term) ||
        r.email?.toLowerCase().includes(term) ||
        r.message?.toLowerCase().includes(term)
      )
    })

    const dir = sortDir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name) * dir
      if (sortKey === 'guests') {
        return ((parseInt(a.guests, 10) || 0) - (parseInt(b.guests, 10) || 0)) * dir
      }
      return (
        (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()) * dir
      )
    })
  }, [rsvps, search, filter, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
    }
  }

  const sortArrow = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''

  // Open the mail app with all confirmed (Yes) guests on BCC.
  const emailAttendees = () => {
    const emails = rsvps
      .filter((r) => r.attending === 'yes' && r.email)
      .map((r) => r.email)
    if (!emails.length) {
      window.alert('No guests have confirmed “Yes” yet.')
      return
    }
    const subject = encodeURIComponent(`${couple.brideFirstName} & ${couple.groomFirstName} — Wedding Update`)
    window.location.href = `mailto:?bcc=${emails.join(',')}&subject=${subject}`
  }

  const printList = () => window.print()

  const exportCsv = () => {
    const head = ['Name', 'Email', 'Attending', 'Guests', 'Events', 'Message', 'Submitted']
    const esc = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const rows = rsvps.map((r) =>
      [r.name, r.email, r.attending, r.guests, r.events, r.message, r.submittedAt]
        .map(esc)
        .join(','),
    )
    const blob = new Blob([[head.join(','), ...rows].join('\n')], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wedding-rsvps.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const remove = async (id: string) => {
    if (!db) return
    if (!window.confirm('Delete this RSVP? This cannot be undone.')) return
    await deleteDoc(doc(db, 'rsvps', id))
  }

  const removeWish = async (id: string) => {
    if (!db) return
    if (!window.confirm('Delete this message from the guestbook? This cannot be undone.')) return
    await deleteDoc(doc(db, 'guestbook', id))
  }

  const fmtDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return iso
    }
  }

  // ── Not configured yet ─────────────────────────────────────────────
  if (!firebaseEnabled) {
    return (
      <div className="admin admin--center">
        <div className="admin__card">
          <h1>Guest List</h1>
          <p className="admin__notice">
            The shared guest list isn’t connected yet. Add your Firebase details in{' '}
            <code>src/lib/firebase.ts</code> (see <code>FIREBASE_SETUP.md</code>) to enable
            the password-protected admin area.
          </p>
          <a className="btn" href=".">
            ← Back to website
          </a>
        </div>
      </div>
    )
  }

  if (checking) {
    return (
      <div className="admin admin--center">
        <div className="admin__spinner" />
      </div>
    )
  }

  // ── Login screen ───────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="admin admin--center">
        <form className="admin__card admin__login" onSubmit={handleLogin}>
          <div className="admin__lock">🔒</div>
          <h1>Couple Login</h1>
          <p className="admin__sub">For {couple.brideFirstName} &amp; {couple.groomFirstName} only.</p>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {loginError && <p className="admin__error">{loginError}</p>}
          <button className="btn" type="submit" disabled={signingIn}>
            {signingIn ? 'Signing in…' : 'Sign In'}
          </button>
          <a className="admin__back" href=".">
            ← Back to website
          </a>
        </form>
      </div>
    )
  }

  // ── Dashboard ──────────────────────────────────────────────────────
  return (
    <div className="admin">
      <header className="admin__bar">
        <div>
          <h1>RSVP Guest List</h1>
          <p className="admin__sub">
            {couple.hashtag}
            {synced && (
              <span className="admin__live">
                <span className="admin__live-dot" /> Live · auto-updating
              </span>
            )}
          </p>
        </div>
        <div className="admin__bar-actions">
          <a className="admin__link" href=".">
            View site
          </a>
          <button className="admin__link" onClick={() => auth && signOut(auth)}>
            Sign out
          </button>
        </div>
      </header>

      <div className="admin__body">
        <div className="admin__tabs">
          <button
            className={`admin__tab${tab === 'rsvps' ? ' is-active' : ''}`}
            onClick={() => setTab('rsvps')}
          >
            💌 RSVPs <span className="admin__tab-count">{rsvps.length}</span>
          </button>
          <button
            className={`admin__tab${tab === 'wishes' ? ' is-active' : ''}`}
            onClick={() => setTab('wishes')}
          >
            ✍️ Well-Wishes <span className="admin__tab-count">{wishes.length}</span>
          </button>
        </div>

        {tab === 'rsvps' && (
        <>
        <div className="admin__stats">
          <div className="stat">
            <span className="stat__num">{stats.total}</span>
            <span className="stat__label">Responses</span>
          </div>
          <div className="stat stat--yes">
            <span className="stat__num">{stats.yes}</span>
            <span className="stat__label">✅ Yes</span>
          </div>
          <div className="stat stat--maybe">
            <span className="stat__num">{stats.maybe}</span>
            <span className="stat__label">🤔 Maybe</span>
          </div>
          <div className="stat stat--no">
            <span className="stat__num">{stats.no}</span>
            <span className="stat__label">❌ No</span>
          </div>
          <div className="stat stat--pending">
            <span className="stat__num">{stats.pending}</span>
            <span className="stat__label">⏳ Pending</span>
          </div>
          <div className="stat stat--head">
            <span className="stat__num">{stats.headcount}</span>
            <span className="stat__label">👥 Expected guests</span>
          </div>
        </div>

        <div className="admin__events">
          {Object.entries(eventCounts).map(([name, n]) => (
            <span className="admin__event" key={name}>
              {name}: <strong>{n}</strong>
            </span>
          ))}
        </div>

        <div className="admin__toolbar">
          <input
            className="admin__search"
            placeholder="Search name, email or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="admin__filters">
            {(['all', 'yes', 'maybe', 'no', 'pending', 'followup'] as Filter[]).map((f) => (
              <button
                key={f}
                className={`admin__filter${filter === f ? ' is-active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
          <div className="admin__tools-right">
            <button className="admin__export" onClick={emailAttendees} disabled={!rsvps.length}>
              📧 Email “Yes” guests
            </button>
            <button className="admin__export" onClick={printList} disabled={!rsvps.length}>
              🖨️ Print
            </button>
            <button className="admin__export" onClick={exportCsv} disabled={!rsvps.length}>
              ⬇ Export CSV
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin__spinner admin__spinner--inline" />
        ) : visible.length === 0 ? (
          <p className="admin__empty">
            {rsvps.length === 0
              ? 'No RSVPs yet. As guests respond, they’ll appear here automatically.'
              : 'No responses match your search.'}
          </p>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th className="admin__th-sort" onClick={() => toggleSort('name')}>
                    Name{sortArrow('name')}
                  </th>
                  <th>Email</th>
                  <th>Attending</th>
                  <th className="admin__th-sort" onClick={() => toggleSort('guests')}>
                    Guests{sortArrow('guests')}
                  </th>
                  <th>Events</th>
                  <th>Message</th>
                  <th className="admin__th-sort" onClick={() => toggleSort('date')}>
                    Date{sortArrow('date')}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Name">{r.name}</td>
                    <td data-label="Email">
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </td>
                    <td data-label="Attending">
                      <span className={`badge ${attendBadge[r.attending] || ''}`}>
                        {r.attending}
                      </span>
                    </td>
                    <td data-label="Guests">{r.guests}</td>
                    <td data-label="Events">{r.events || '—'}</td>
                    <td data-label="Message" className="admin__msg">
                      {r.message || '—'}
                    </td>
                    <td data-label="Date">{fmtDate(r.submittedAt)}</td>
                    <td>
                      <button className="admin__del" onClick={() => remove(r.id)} title="Delete">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </>
        )}

        {tab === 'wishes' && (
          loading ? (
            <div className="admin__spinner admin__spinner--inline" />
          ) : wishes.length === 0 ? (
            <p className="admin__empty">
              No well-wishes yet. Messages guests leave in the Guestbook will appear here.
            </p>
          ) : (
            <div className="admin__wishes">
              {wishes.map((w) => (
                <article className="admin__wish" key={w.id}>
                  <div className="admin__wish-head">
                    <strong>{w.name}</strong>
                    <span className="admin__wish-date">{w.at ? fmtDate(w.at) : ''}</span>
                    <button
                      className="admin__del"
                      onClick={() => removeWish(w.id)}
                      title="Delete message"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="admin__wish-msg">{w.message}</p>
                </article>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
