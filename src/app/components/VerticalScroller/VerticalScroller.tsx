'use client'

import React, { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './VerticalScroller.module.scss'
import { useEmbla } from '@/app/context/EmblaContext'

interface Props {
  children: React.ReactNode
}

export default function VerticalScroller({ children }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false })
  const { setEmblaApi, setSelectedSnap, setSnapCount } = useEmbla()
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    if (!emblaApi) return

    setEmblaApi(emblaApi)
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
    document.body.classList.add('at-hero', 'at-first')

    const onSelect = () => {
      const snap = emblaApi.selectedScrollSnap()
      const last = emblaApi.scrollSnapList().length - 1
      setSelectedSnap(snap)
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

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return
      // Only intercept when embla's pointer-events are disabled (at-last overlay)
      if (!document.body.classList.contains('at-last')) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < 50) return
      if (deltaY > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('settle', onSettle)
      emblaApi.off('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      document.body.classList.remove('at-hero')
    }
  }, [emblaApi, setEmblaApi, setSelectedSnap, setSnapCount])

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
