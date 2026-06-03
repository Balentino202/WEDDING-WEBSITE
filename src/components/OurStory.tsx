import { story, storyTimeline } from '../data/wedding'
import './OurStory.css'

export default function OurStory() {
  return (
    <section id="story" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">{story.subheading}</span>
          <h2>{story.heading}</h2>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="story__intro reveal">
          {story.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <ol className="timeline">
          {storyTimeline.map((item, i) => (
            <li className={`timeline__item reveal${i % 2 ? ' timeline__item--right' : ''}`} key={i}>
              <div className="timeline__dot" aria-hidden="true" />
              <div className="timeline__card">
                <span className="timeline__year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
