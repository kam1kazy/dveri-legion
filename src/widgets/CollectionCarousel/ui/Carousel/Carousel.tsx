'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

import type { ISlide } from '../../config/slides';
import { NextButton, PrevButton, usePrevNextButtons } from '../Arrow';
import { Slide } from '../Slide/Slide';
import styleSlide from '../Slide/Slide.module.scss';
import style from './Carousel.module.scss';
import { useAutoplayHandlers } from './hooks/useAutoplayHandlers';
import { useOnScroll } from './hooks/useOnScroll';
import { useSlidesInView } from './hooks/useSlidesInView';

interface ICarousel {
  slides: ISlide[];
  options?: EmblaOptionsType;
}

const Carousel: React.FC<ICarousel> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll({ playOnInit: false })]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const updateSlidesInView = useSlidesInView(setSlidesInView);
  const onScroll = useOnScroll(setScrollProgress);
  const { onButtonAutoplayClick, toggleAutoplay } = useAutoplayHandlers(emblaApi);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) {
      return;
    }

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

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

        <div className={style.embla__controls}>
          <div className={style.embla__buttons}>
            <PrevButton
              onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={() => onButtonAutoplayClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>

        <button className={style.embla__play} onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>

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
