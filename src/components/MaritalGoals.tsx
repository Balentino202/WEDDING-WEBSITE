import { maritalGoals } from '../data/wedding'
import './MaritalGoals.css'

export default function MaritalGoals() {
  return (
    <section id="goals" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Built on the Word</span>
          <h2>Kingdom-Driven Marital Goals</h2>
          <p className="sub">
            More than a wedding — a covenant with purpose. These are the pillars we are building
            our home upon.
          </p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="goals__grid">
          {maritalGoals.map((goal, i) => (
            <article className="goal reveal" key={goal.title} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="goal__icon" aria-hidden="true">
                {goal.icon}
              </div>
              <h3>{goal.title}</h3>
              <p>{goal.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
