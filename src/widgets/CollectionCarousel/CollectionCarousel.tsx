import { EmblaOptionsType } from 'embla-carousel';

import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image/Image';

import styles from './CollectionCarousel.module.scss';
import { slides } from './config/slides';
import Carousel from './ui/Carousel/Carousel';

export const CollectionCarousel = () => {
  const OPTIONS: EmblaOptionsType = {
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  };

  return (
    <section className="carousel">
      <div className="container">
        <div className="wrapper">
          <div className={styles.collection_carousel}>
            <div className={styles.collection_carousel__header}>
              <h2>Коллекции</h2>

              <div className={styles.control}>
                <div className={styles['button-next']}>
                  <Image src={'./images/icons/arrow-carousel.svg'} alt={'Следующий слайд'} />
                </div>
                <div className={styles['button-prev']}>
                  <Image src={'./images/icons/arrow-carousel.svg'} alt={'Следующий слайд'} />
                </div>
                <div className="pagination"></div>
              </div>
            </div>

            <Carousel slides={slides} options={OPTIONS} />

            <div className={styles['collection_carousel-link']}>
              <Button
                text="Посмотреть все коллекции"
                icon={{ src: './images/icons/arrow-right.svg', alt: 'icon' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
