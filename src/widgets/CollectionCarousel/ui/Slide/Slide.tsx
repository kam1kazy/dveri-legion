import NextLink from 'next/link';
import { useState } from 'react';

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
  const className = `${style.slide} ${styleEmbla['embla__lazy-load']} ${hasLoaded ? styleEmbla['embla__lazy-load--has-loaded'] : ''}`;

  const inner = (
    <>
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
          <p>{slide.subtitle}</p>
        </div>

        <div className={style['slide__inner--info-name']}>
          <p>{slide.title}</p>
          <p>{slide.subtitle}</p>

          <span className={style['slide__inner--info-btn']}>
            Подробнее
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div className={`${styleEmbla.embla__slide}`}>
      {slide.link ? (
        <NextLink href={slide.link} className={className}>
          {inner}
        </NextLink>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </div>
  );
};
