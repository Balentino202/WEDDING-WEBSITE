import { useState } from 'react'
import { faqs, colourOfTheDay } from '../data/wedding'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Good to Know</span>
          <h2>Frequently Asked Questions</h2>
          <p className="sub">Everything you need to celebrate with us, answered.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="faq__colours reveal">
          <h3>Colours of the Day</h3>
          <div className="faq__swatches">
            {colourOfTheDay.map((c) => (
              <div className="faq__swatch" key={c.name}>
                <span className="faq__chip" style={{ background: c.hex }} aria-hidden="true" />
                <span className="faq__chip-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="faq__list">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item reveal${isOpen ? ' is-open' : ''}`} key={i}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>
                <div className="faq__a" role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
