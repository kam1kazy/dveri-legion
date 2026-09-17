'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { ArrowCarouselIcon } from '@/shared/ui/Icons';

import { promotions, promotionsSection } from './config/promotions';
import styles from './PromotionsCarousel.module.scss';

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
  skipSnaps: false,
};

export const PromotionsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);

    return () => {
      window.clearInterval(timer);
    };
  }, [emblaApi, selectedIndex]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{promotionsSection.title}</h2>
          <p className={styles.subtitle}>{promotionsSection.subtitle}</p>
        </div>

        <div className={styles.carousel}>
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.track}>
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className={styles.slide}
                  style={{ ['--bg-image' as string]: `url(${promo.image})` }}
                >
                  <NextImage
                    src={promo.image}
                    alt={promo.title}
                    width={600}
                    height={600}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.content}>
                      <span className={styles.discount}>{promo.discount}</span>
                      <NextLink href={`/blog/${promo.articleSlug}`} className={styles.slideTitle}>
                        {promo.title}
                      </NextLink>
                      <p className={styles.slideDescription}>{promo.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            aria-label="Предыдущая акция"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowCarouselIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label="Следующая акция"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowCarouselIcon />
          </button>

          <div className={styles.dots} role="tablist" aria-label="Слайды акций">
            {promotions.map((promo, index) => (
              <button
                key={promo.id}
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Слайд ${index + 1}`}
                className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
