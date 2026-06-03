import { couple, navLinks } from '../data/wedding'
import './Footer.css'

export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__monogram">P&amp;I</div>
        <p className="footer__names">
          {couple.brideFirstName} &amp; {couple.groomFirstName}
        </p>
        <p className="footer__date">
          {couple.weddingDateLabel} · {couple.location}
        </p>

        <nav className="footer__links">
          {navLinks.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <p className="footer__hashtag">{couple.hashtag}</p>

        <p className="footer__verse">
          “Many waters cannot quench love, neither can the floods drown it.” — Song of Solomon 8:7
        </p>

        <p className="footer__credit">
          Made with love for {couple.brideFirstName} &amp; {couple.groomFirstName} · {couple.tagline}
        </p>
      </div>
    </footer>
  )
}
