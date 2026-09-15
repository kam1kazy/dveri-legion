'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

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

interface IDropdownCarousel {
  items: ICollectionNavItem[];
  hoveredId: number | null;
  isActive: boolean;
}

export const DropdownCarousel = ({ items, hoveredId, isActive }: IDropdownCarousel) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      playOnInit: false,
      speed: 0.7,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const autoScroll = emblaApi.plugins().autoScroll;

    if (isActive) {
      emblaApi.reInit();
      autoScroll?.play();
      return;
    }

    autoScroll?.stop();
  }, [emblaApi, isActive]);

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
