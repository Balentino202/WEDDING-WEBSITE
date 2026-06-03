import { useEffect, useState } from 'react'
import { couple } from '../data/wedding'
import './Preloader.css'

export default function Preloader() {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Lock scroll while the splash is visible.
    document.body.style.overflow = 'hidden'
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1700)
    const goneTimer = window.setTimeout(() => {
      setGone(true)
      document.body.style.overflow = ''
    }, 2500)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(goneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div className={`preloader${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__ring">
          <span className="preloader__monogram">P&amp;I</span>
        </div>
        <p className="preloader__names">
          {couple.brideFirstName} &amp; {couple.groomFirstName}
        </p>
        <p className="preloader__tag">{couple.tagline}</p>
      </div>
    </div>
  )
}
