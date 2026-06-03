import { couple } from '../data/wedding'
import Countdown from './Countdown'
import './Hero.css'

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__eyebrow">Together with their families</p>
        <p className="hero__script">{couple.tagline}</p>

        <h1 className="hero__names">
          <span>{couple.brideFirstName}</span>
          <span className="hero__amp">&amp;</span>
          <span>{couple.groomFirstName}</span>
        </h1>

        <p className="hero__meta">
          {couple.weddingDateLabel} &nbsp;·&nbsp; {couple.location}
        </p>

        <div className="hero__countdown">
          <Countdown />
        </div>

        <div className="hero__cta">
          <button className="btn" onClick={() => scrollTo('rsvp')}>
            RSVP Now
          </button>
          <button className="btn btn--ghost hero__cta-ghost" onClick={() => scrollTo('story')}>
            Our Story
          </button>
        </div>
      </div>

      <button
        className="hero__scroll"
        aria-label="Scroll down"
        onClick={() => scrollTo('story')}
      >
        <span />
      </button>
    </section>
  )
}
