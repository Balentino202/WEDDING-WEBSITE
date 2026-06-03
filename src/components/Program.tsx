import { program } from '../data/wedding'
import './Program.css'

export default function Program() {
  return (
    <section id="program" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Order of the Day</span>
          <h2>Wedding Program</h2>
          <p className="sub">A glimpse of how the celebration will unfold.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <ol className="program">
          {program.map((item, i) => (
            <li className="program__item reveal" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="program__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="program__time">{item.time}</span>
              <span className="program__title">{item.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
