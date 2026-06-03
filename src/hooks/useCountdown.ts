import { useEffect, useState } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calc(target: number): TimeLeft {
  const diff = target - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds, isPast: false }
}

/** Live countdown to an ISO date string, ticking every second. */
export function useCountdown(targetISO: string): TimeLeft {
  const target = new Date(targetISO).getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calc(target))

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(calc(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return timeLeft
}
