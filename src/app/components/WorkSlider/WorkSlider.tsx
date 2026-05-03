'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useState, useRef, useCallback } from 'react';
import 'swiper/css';

import Image from 'next/image';
import styles from './WorkSlider.module.scss';

interface NdaProject {
  client: string;
  role: string;
  year?: string;
  logo?: string;
  summary: string;
  tech: string[];
  highlights: string[];
}

interface WorkItem {
  id: string;
  type?: string;
  title: string;
  client?: string;
  year?: string;
  role?: string;
  summary?: string;
  tech?: string[];
  highlights?: string[];
  impact?: string | null;
  image?: string;
  url?: string;
  urlLabel?: string;
  nda?: boolean;
  subtitle?: string;
  projects?: NdaProject[];
}

export default function WorkSlider({ works }: { works: WorkItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const wheelCooldown = useRef(false);

  const isLast = activeIndex === works.length - 1;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical handled by Swiper
    if (wheelCooldown.current) return;
    if (e.deltaX > 10) swiperRef.current?.slideNext();
    else if (e.deltaX < -10) swiperRef.current?.slidePrev();
    wheelCooldown.current = true;
    setTimeout(() => { wheelCooldown.current = false; }, 800);
  }, []);

  return (
    <div className={styles.sliderWrapper} onWheel={handleWheel}>
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
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 62vw"
                  className={styles.image}
                />
                <div className={styles.overlay} />
                {work.url && !work.url.startsWith('mailto:') && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.overlayLink}
                  >
                    <span className={styles.overlayCta}>Visit site ↗</span>
                  </a>
                )}
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.copy}>
                {work.type === 'nda' ? (
                  <>
                    <span className={styles.meta}>Under NDA</span>
                    <h2 className={styles.title}>{work.title}</h2>
                    {work.subtitle && <p className={styles.description}>{work.subtitle}</p>}
                    {work.projects && (
                      <ul className={styles.ndaProjects}>
                        {work.projects.map((project) => (
                          <li key={project.client} className={styles.ndaProject}>
                            {project.logo && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={project.logo} alt={`${project.client} logo`} className={styles.ndaLogo} />
                            )}
                            <span className={styles.ndaClient}>{project.client}</span>
                            <span className={styles.ndaRole}>{project.role}{project.year && ` — ${project.year}`}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    {work.role && work.year && (
                      <span className={styles.meta}>{work.role} — {work.year}</span>
                    )}
                    <h2 className={styles.title}>{work.title}</h2>
                    {work.summary && <p className={styles.description}>{work.summary}</p>}
                    {work.tech && work.tech.length > 0 && (
                      <ul className={styles.tech}>
                        {work.tech.slice(0, 5).map((t) => (
                          <li key={t} className={styles.techTag}>{t}</li>
                        ))}
                      </ul>
                    )}
                    {work.url && (
                      <a
                        href={work.url}
                        target={work.url.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {work.urlLabel ?? 'View project →'}
                      </a>
                    )}
                  </>
                )}
              </div>
              <div className={styles.controls}>
                {activeIndex > 0 ? (
                  <button
                    className={styles.prevButton}
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous slide"
                  >
                    ← Prev
                  </button>
                ) : (
                  <span className={styles.controlPlaceholder} />
                )}
                <div className={styles.counter}>
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className={styles.counterDivider} />
                  <span className={styles.counterTotal}>{String(works.length).padStart(2, '0')}</span>
                </div>
                {!isLast ? (
                  <button
                    className={styles.nextButton}
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                  >
                    Next →
                  </button>
                ) : (
                  <span className={styles.controlPlaceholder} />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
