'use client'

import React, { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './VerticalScroller.module.scss'

interface Props {
  children: React.ReactNode
}

export default function VerticalScroller({ children }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false })
  const isScrolling = useRef(false)

  useEffect(() => {
    if (!emblaApi) return

    document.body.classList.add('at-hero', 'at-first')

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap()
      const last = emblaApi.scrollSnapList().length - 1
      document.body.classList.toggle('at-first', snap === 0)
      document.body.classList.toggle('at-last', snap === last)
      document.body.classList.toggle('at-hero', snap === 0 || snap === last)
    }
    const onSettle = () => { isScrolling.current = false }
    const onScroll = () => { isScrolling.current = true }

    emblaApi.on('select', onSelect)
    emblaApi.on('settle', onSettle)
    emblaApi.on('scroll', onScroll)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current) return
      if (e.deltaY > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); emblaApi.scrollNext() }
      if (e.key === 'ArrowUp') { e.preventDefault(); emblaApi.scrollPrev() }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('settle', onSettle)
      emblaApi.off('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('at-hero')
    }
  }, [emblaApi])

  return (
    <div ref={emblaRef} className={styles.embla}>
      <div className={styles.container}>
        {React.Children.toArray(children).map((child, i) => (
          <div key={i} className={styles.slide}>
            <div className={styles.slideInner}>
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
