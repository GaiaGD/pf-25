'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  images: string[];
  title: string;
}

export default function ImageSlider({ images, title }: ImageSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay.start();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay.stop();
    swiperRef.current?.slideToLoop(0, 500);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        modules={[Autoplay]}
        loop
        allowTouchMove={false}
        speed={600}
        autoplay={{ delay: 1400, disableOnInteraction: false }}
        onSwiper={(s) => {
          swiperRef.current = s;
          s.autoplay.stop();
        }}
        className={styles.swiper}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
