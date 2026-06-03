import type { WeddingEvent } from '../data/wedding'

/** Format a local ISO string (YYYY-MM-DDTHH:mm:ss) as calendar stamp YYYYMMDDTHHMMSS. */
function stamp(localISO: string): string {
  return localISO.replace(/[-:]/g, '').replace('.000', '')
}

function describe(ev: WeddingEvent): { title: string; details: string; location: string } {
  return {
    title: `Purity & Isaiah Wedding — ${ev.name}`,
    details: `Join us to celebrate the wedding of Purity & Isaiah. ${ev.name} at ${ev.venue}. #SongsOfSong2026`,
    location: `${ev.venue}, ${ev.address}`,
  }
}

/** Build a Google Calendar "add event" URL. */
export function googleCalendarUrl(ev: WeddingEvent): string {
  const { title, details, location } = describe(ev)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${stamp(ev.startISO)}/${stamp(ev.endISO)}`,
    details,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** Build the contents of an .ics file (works with Apple Calendar, Outlook, etc.). */
export function icsContent(ev: WeddingEvent): string {
  const { title, details, location } = describe(ev)
  const uid = `${stamp(ev.startISO)}-${ev.name.replace(/\s+/g, '')}@purity-isaiah-wedding`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Purity & Isaiah Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${stamp(ev.startISO)}`,
    `DTEND:${stamp(ev.endISO)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Trigger a download of an .ics file for the given event. */
export function downloadIcs(ev: WeddingEvent): void {
  const blob = new Blob([icsContent(ev)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${ev.name.replace(/\s+/g, '-').toLowerCase()}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
