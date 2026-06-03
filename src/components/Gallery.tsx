import { useEffect, useMemo, useState } from 'react'
import { gallery, type GalleryImage } from '../data/wedding'
import './Gallery.css'

type Filter = 'all' | GalleryImage['category']

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bride', label: 'The Bride' },
  { id: 'groom', label: 'The Groom' },
]

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  )

  const close = () => setLightbox(null)
  const show = (delta: number) =>
    setLightbox((cur) => {
      if (cur === null) return cur
      return (cur + delta + visible.length) % visible.length
    })

  // Keyboard controls + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') show(1)
      if (e.key === 'ArrowLeft') show(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, visible.length])

  return (
    <section id="gallery" className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">Captured Moments</span>
          <h2>Our Gallery</h2>
          <p className="sub">A collection of moments we hold dear.</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="gallery__filters reveal">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`gallery__filter${filter === f.id ? ' is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {visible.map((img, i) => (
            <button
              className="gallery__item"
              key={img.src}
              onClick={() => setLightbox(i)}
              aria-label={`Open ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className="gallery__zoom" aria-hidden="true">
                ⤢
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox__close" aria-label="Close" onClick={close}>
            ✕
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              show(-1)
            }}
          >
            ‹
          </button>
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={visible[lightbox].src} alt={visible[lightbox].alt} />
            <figcaption>
              {visible[lightbox].alt} · {lightbox + 1} / {visible.length}
            </figcaption>
          </figure>
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              show(1)
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}
