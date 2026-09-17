'use client';

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';

import styles from './CollectionCarousel.module.scss';
import type { ISlide } from './config/slides';
import Carousel from './ui/Carousel/Carousel';
import { Controls } from './ui/Controls';

const OPTIONS: EmblaOptionsType = {
  align: 'start',
  loop: true,
  skipSnaps: false,
  dragFree: true,
  containScroll: 'trimSnaps',
};

interface ICollectionCarousel {
  slides: ISlide[];
}

export const CollectionCarousel = ({ slides }: ICollectionCarousel) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      // Пауза и при наведении на стрелки в шапке, не только на viewport
      rootNode: (emblaRoot) => emblaRoot.closest(`.${styles.collection_carousel}`),
    }),
  ]);

  return (
    <section className="carousel">
      <div className="container">
        <div className="wrapper">
          <div className={styles.collection_carousel}>
            <div className={styles.collection_carousel__header}>
              <h2>Коллекции</h2>
              <Controls emblaApi={emblaApi as EmblaCarouselType} />
            </div>

            <Carousel
              slides={slides}
              options={OPTIONS}
              emblaApi={emblaApi as EmblaCarouselType}
              emblaRef={emblaRef}
            />

            <div className={styles['collection_carousel-link']}>
              <Button border filled text="Посмотреть весь каталог" link="/catalog">
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
