import { useEffect, useState } from 'react'
import { couple, navLinks, headerLinks } from '../data/wedding'
import ThemeToggle from './ThemeToggle'
import MusicToggle from './MusicToggle'
import './Navbar.css'

// Sections kept off the desktop bar (still shown in the mobile drawer).
const headerIds = new Set(headerLinks.map((l) => l.id))
// The overflow sections, grouped under a "More" dropdown on desktop.
const extraLinks = navLinks.filter((l) => !headerIds.has(l.id))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close the "More" dropdown when clicking anywhere outside it.
  useEffect(() => {
    if (!moreOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.nav__more')) setMoreOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [moreOpen])

  const handleClick = (id: string) => {
    setOpen(false)
    setMoreOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const moreActive = extraLinks.some((l) => l.id === active)

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <button className="nav__brand" onClick={() => handleClick('home')}>
          <span className="nav__monogram">P&amp;I</span>
          <span className="nav__brand-text">{couple.tagline}</span>
        </button>

        <nav className={`nav__links${open ? ' is-open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id} className={headerIds.has(link.id) ? '' : 'nav__extra'}>
                <button
                  className={active === link.id ? 'is-active' : ''}
                  onClick={() => handleClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}

            {/* Desktop-only dropdown holding the overflow sections */}
            <li className={`nav__more${moreOpen ? ' is-open' : ''}`}>
              <button
                className={`nav__more-toggle${moreActive ? ' is-active' : ''}`}
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={(e) => {
                  e.stopPropagation()
                  setMoreOpen((o) => !o)
                }}
              >
                More <span className="nav__chevron" aria-hidden="true">⌄</span>
              </button>
              <ul className="nav__dropdown">
                {extraLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      className={active === link.id ? 'is-active' : ''}
                      onClick={() => handleClick(link.id)}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <div className="nav__actions">
          <MusicToggle />
          <ThemeToggle />
          <button
            className={`nav__burger${open ? ' is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
