import { useEffect, useRef, useState } from 'react'

/**
 * Soft background-music control. Drop an audio file at
 * /public/music/wedding-theme.mp3 to enable it.
 * Browsers block autoplay with sound, so playback starts on user click.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio('./music/wedding-theme.mp3')
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setAvailable(false))
    }
  }

  if (!available) return null

  return (
    <button
      type="button"
      className={`icon-btn music-btn${playing ? ' is-playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? '♫' : '♪'}
    </button>
  )
}
