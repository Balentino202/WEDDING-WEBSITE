import './Petals.css'

// A gentle, decorative shower of falling petals over the page.
// Purely ornamental — pointer-events disabled and hidden for reduced motion.
const PETALS = Array.from({ length: 14 })

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            animationDelay: `${(i % 7) * 1.5}s`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            transform: `scale(${0.6 + (i % 4) * 0.18})`,
          }}
        />
      ))}
    </div>
  )
}
