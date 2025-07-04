import { EmblaOptionsType } from 'embla-carousel';

import { Button } from '@/shared/ui/Button';

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
          <div className="collection_carousel">
            <div className="collection_carousel__header">
              <h2>Коллекции</h2>

              <div className="control">
                <div className="button-next"></div>
                <div className="button-prev"></div>
                <div className="pagination"></div>
              </div>
            </div>

            <Carousel slides={slides} options={OPTIONS} />

            <div className="collection_carousel-link">
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
