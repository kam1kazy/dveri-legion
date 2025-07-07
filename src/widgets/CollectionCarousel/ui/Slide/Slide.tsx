import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';

import type { ISlide } from '../../config/slides';
import styleEmbla from '../Carousel/Carousel.module.scss';
import { LazyLoadImage } from '../LazyLoadImage';
import style from './Slide.module.scss';

type PropType = {
  slide: ISlide;
  inView: boolean;
};

export const Slide: React.FC<PropType> = (props) => {
  const { slide, inView } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className={`${styleEmbla.embla__slide}`}>
      <div
        className={`${style.slide} ${styleEmbla['embla__lazy-load']} ${hasLoaded && styleEmbla['embla__lazy-load--has-loaded']}`}
      >
        <div className={style['slide__inner--text']}>
          <p className={style.text1}>{slide.title}</p>
          <p className={style.text2}>{slide.title}</p>
        </div>

        <LazyLoadImage
          slide={slide}
          inView={inView}
          setHasLoaded={setHasLoaded}
          hasLoaded={hasLoaded}
        />

        <div className={style['slide__inner--info']}>
          <div className={style['slide__inner--info-color']}>
            <p>color ico**</p>
          </div>

          <div className={style['slide__inner--info-name']}>
            <p>{slide.title}</p>
            <p>{slide.subtitle}</p>

            <Button text="Подробнее" filled dark className={style['slide__inner--info-btn']}>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
