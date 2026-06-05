import { weddingEvents } from '../data/wedding'
import { downloadIcs, googleCalendarUrl } from '../utils/calendar'
import './WeddingDetails.css'

export default function WeddingDetails() {
  // The map focuses on the White Wedding venue only.
  const mapEvent =
    weddingEvents.find((ev) => ev.name === 'White Wedding') ?? weddingEvents[0]

  return (
    <section id="details" className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">When &amp; Where</span>
          <h2>Wedding Details</h2>
          <p className="sub">We would be honoured to have you celebrate each moment with us.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="events__grid">
          {weddingEvents.map((ev, i) => (
            <article className="event" key={ev.name}>
              <span className="event__order">{String(i + 1).padStart(2, '0')}</span>
              <h3>{ev.name}</h3>
              <p className="event__date">{ev.date}</p>
              <p className="event__time">{ev.time}</p>
              <div className="event__venue">
                <strong>{ev.venue}</strong>
                <span>{ev.address}</span>
              </div>

              <div className="event__cal">
                <span className="event__cal-label">Add to calendar</span>
                <div className="event__cal-btns">
                  <a
                    className="event__cal-btn"
                    href={googleCalendarUrl(ev)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google
                  </a>
                  <button className="event__cal-btn" onClick={() => downloadIcs(ev)}>
                    Apple / .ics
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="venue-map" className="map reveal">
          <div className="map__caption">
            <span>📍</span> {mapEvent.venue} — {mapEvent.address}
          </div>
          <iframe
            title={`Map of ${mapEvent.venue}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapEvent.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
