'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useRef } from 'react';

import type { ICollectionNavItem } from '../../../config/collections';
import styles from './DropdownCarousel.module.scss';
import { DropdownSlide } from './DropdownSlide';

const OPTIONS: EmblaOptionsType = {
  axis: 'y',
  loop: true,
  align: 'start',
  watchDrag: false,
  skipSnaps: false,
};

/** Ждём окончания анимации высоты дропдауна, иначе Embla resize сбрасывает скролл. */
const OPEN_ANIMATION_MS = 600;

interface IDropdownCarousel {
  items: ICollectionNavItem[];
  hoveredId: string | null;
  isActive: boolean;
}

export const DropdownCarousel = ({ items, hoveredId, isActive }: IDropdownCarousel) => {
  const wasActiveRef = useRef(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      playOnInit: false,
      speed: 0.7,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  ]);

  const slidesKey = items.map((item) => item.id).join(',');

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    if (!isActive || items.length === 0) {
      emblaApi.plugins().autoScroll?.stop();
      wasActiveRef.current = false;
      return;
    }

    let cancelled = false;
    const delay = wasActiveRef.current ? 0 : OPEN_ANIMATION_MS;
    wasActiveRef.current = true;

    const ensurePlaying = () => {
      if (cancelled) {
        return;
      }
      const autoScroll = emblaApi.plugins().autoScroll;
      if (autoScroll && !autoScroll.isPlaying()) {
        autoScroll.play(0);
      }
    };

    const startTimer = window.setTimeout(() => {
      emblaApi.reInit();
      ensurePlaying();
    }, delay);

    // Resize при анимации высоты дропдауна пересоздаёт плагин и глушит AutoScroll.
    const watchdog = window.setInterval(ensurePlaying, 400);
    emblaApi.on('reInit', ensurePlaying);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearInterval(watchdog);
      emblaApi.off('reInit', ensurePlaying);
      emblaApi.plugins().autoScroll?.stop();
    };
  }, [emblaApi, isActive, items.length, slidesKey]);

  const hovered = items.find((item) => item.id === hoveredId);

  return (
    <div className={styles.carousel}>
      <div className={`${styles.selected} ${hovered ? styles.cloneIn : ''}`}>
        {hovered && <DropdownSlide item={hovered} />}
      </div>

      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {items.map((item) => (
            <DropdownSlide key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
