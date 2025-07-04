'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useCallback } from 'react';

import type { ISlide } from '../config/slides';
import style from './Carousel/Carousel.module.scss';
import styleSlide from './Slide/Slide.module.scss';

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
  slide: ISlide;
  inView: boolean;
  setHasLoaded: Dispatch<SetStateAction<boolean>>;
  hasLoaded: boolean;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { slide, inView, setHasLoaded, hasLoaded } = props;

  const setLoaded = useCallback(() => {
    if (inView) {
      setHasLoaded(true);
    }
  }, [inView, setHasLoaded]);

  return (
    <>
      {!hasLoaded && <span className={style['embla__lazy-load__spinner']} />}
      <div className={`${styleSlide['slide__inner--img']} ${style.embla__slide__wrapper}`}>
        <Image
          className={`${style.embla__slide__img} ${style['embla__lazy-load__img']}`}
          onLoad={setLoaded}
          src={inView ? slide.image : PLACEHOLDER_SRC}
          alt={slide.title}
          data-src={slide.image}
          width={450}
          height={400}
          style={{
            objectPosition: 'top',
          }}
        />
      </div>
    </>
  );
};
