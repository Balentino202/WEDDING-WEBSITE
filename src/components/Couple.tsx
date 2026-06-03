import { bride, groom, type Person } from '../data/wedding'
import './Couple.css'

function PersonCard({ person, side }: { person: Person; side: 'bride' | 'groom' }) {
  return (
    <article className={`person reveal person--${side}`}>
      <div className="person__photo-wrap">
        <img src={person.photo} alt={person.name} loading="lazy" />
        <span className="person__badge">{person.role}</span>
      </div>

      <div className="person__body">
        <h3 className="person__name">{person.name}</h3>

        <dl className="person__facts">
          <div>
            <dt>From</dt>
            <dd>{person.state}</dd>
          </div>
          <div>
            <dt>Born</dt>
            <dd>{person.dob}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{person.education}</dd>
          </div>
        </dl>

        <div className="person__group">
          <h4>Roles</h4>
          <ul className="person__roles">
            {person.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="person__group">
          <h4>A Few Favourite Things</h4>
          <ul className="person__likes">
            {person.likes.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        <a className="btn btn--ghost person__fb" href={person.facebookUrl} target="_blank" rel="noreferrer">
          View Facebook Profile
        </a>
      </div>
    </article>
  )
}

export default function Couple() {
  return (
    <section id="couple" className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">The Happy Couple</span>
          <h2>Bride &amp; Groom</h2>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="couple__grid">
          <PersonCard person={bride} side="bride" />
          <div className="couple__amp reveal" aria-hidden="true">
            &amp;
          </div>
          <PersonCard person={groom} side="groom" />
        </div>
      </div>
    </section>
  )
}
