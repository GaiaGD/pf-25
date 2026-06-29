'use client'

import styles from './Footer.module.scss'
import { useEmbla } from '@/app/context/EmblaContext'

export default function Footer() {
  const { emblaApi, selectedSnap, snapCount } = useEmbla()

  return (
    <>
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === selectedSnap ? styles.dotActive : ''}`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.controlBtn}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Gaia DG.</p>
        </div>
      </footer>
    </>
  )
}
