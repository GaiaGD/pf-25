'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useState, useRef } from 'react';
import 'swiper/css';

import styles from './WorkSlider.module.scss';

interface Work {
  id: number;
  title: string;
  description: string;
  category?: string;
  year?: string;
  image?: string;
  url?: string;
  urlLabel?: string;
}

export default function WorkSlider({ works }: { works: Work[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const isLast = activeIndex === works.length - 1;

  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Mousewheel, Keyboard, A11y]}
        direction="horizontal"
        mousewheel
        keyboard
        speed={700}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
        className={styles.swiper}
      >
        {works.map((work) => (
          <SwiperSlide key={work.id} className={`${styles.slide} ${!work.image ? styles.slideTextOnly : ''}`}>
            {work.image && (
              <div className={styles.imageWrapper}>
                <img src={work.image} alt={work.title} className={styles.image} />
                <div className={styles.overlay} />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.copy}>
                {work.category && work.year && (
                  <span className={styles.meta}>{work.category} — {work.year}</span>
                )}
                <h2 className={styles.title}>{work.title}</h2>
                <p className={styles.description}>{work.description}</p>
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {work.urlLabel ?? 'View project →'}
                  </a>
                )}
              </div>
              <div className={styles.controls}>
                <div className={styles.counter}>
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className={styles.counterDivider} />
                  <span className={styles.counterTotal}>{String(works.length).padStart(2, '0')}</span>
                </div>
                {!isLast && (
                  <button
                    className={styles.nextButton}
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
