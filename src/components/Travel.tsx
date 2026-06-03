import { hotels, travelIntro } from '../data/wedding'
import './Travel.css'

export default function Travel() {
  return (
    <section id="travel" className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Plan Your Stay</span>
          <h2>Accommodation &amp; Travel</h2>
          <p className="sub">{travelIntro}</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="travel__grid">
          {hotels.map((h) => (
            <article className="hotel reveal" key={h.name}>
              <div className="hotel__top">
                <h3>{h.name}</h3>
                <span className="hotel__tier">{h.priceTier}</span>
              </div>
              <p className="hotel__area">📍 {h.area}</p>
              <p className="hotel__distance">🚗 {h.distance}</p>

              <div className="hotel__actions">
                {h.phone && (
                  <a className="hotel__btn" href={`tel:${h.phone.replace(/\s/g, '')}`}>
                    Call
                  </a>
                )}
                <a
                  className="hotel__btn hotel__btn--primary"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find on map
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="travel__note reveal">
          ✈️ Flying in? The nearest airports are <strong>Asaba (ABB)</strong> and{' '}
          <strong>Enugu (ENU)</strong>, each about 1–1.5 hours from Nnewi by road. Hotel names and
          numbers above are samples — update them in <code>src/data/wedding.ts</code>.
        </p>
      </div>
    </section>
  )
}
