import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { useEffect, useState } from 'react';

import type { ISlide } from '../../config/slides';
import { Slide } from '../Slide/Slide';
import styleSlide from '../Slide/Slide.module.scss';
import style from './Carousel.module.scss';
import { useOnScroll } from './hooks/useOnScroll';
import { useSlidesInView } from './hooks/useSlidesInView';

interface ICarousel {
  slides: ISlide[];
  options?: EmblaOptionsType;
  emblaRef: EmblaViewportRefType;
  emblaApi: EmblaCarouselType;
}

const Carousel: React.FC<ICarousel> = (props) => {
  const { slides, emblaApi, emblaRef } = props;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const updateSlidesInView = useSlidesInView(setSlidesInView);
  const onScroll = useOnScroll(setScrollProgress);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onScroll(emblaApi);
    emblaApi.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll);
  }, [emblaApi, onScroll]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className={style.embla}>
      <div className={styleSlide.slide__inner}>
        <div className={style.embla__viewport} ref={emblaRef}>
          <div className={style.embla__container}>
            {slides.map((slide, index) => (
              <Slide key={index} slide={slide} inView={slidesInView.indexOf(index) > -1} />
            ))}
          </div>
        </div>

        <div className={style.embla__progress}>
          <div
            className={style.embla__progress__bar}
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
