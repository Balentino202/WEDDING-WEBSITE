import { useCountdown } from '../hooks/useCountdown'
import { couple } from '../data/wedding'
import './Countdown.css'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(couple.weddingDateISO)

  if (isPast) {
    return (
      <div className="countdown countdown--done">
        <p>We're married! Thank you for celebrating with us. 💍</p>
      </div>
    )
  }

  const units = [
    { label: 'Days', value: pad(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ]

  return (
    <div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {units.map((u) => (
        <div className="countdown__unit" key={u.label}>
          <span className="countdown__value">{u.value}</span>
          <span className="countdown__label">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
