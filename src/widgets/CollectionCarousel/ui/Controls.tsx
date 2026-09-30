import type { EmblaCarouselType } from 'embla-carousel';

import { ArrowCarouselIcon } from '@/shared/ui/Icons';

import styles from '../CollectionCarousel.module.scss';
import { NextButton, PrevButton, usePrevNextButtons } from '../ui/Arrow';
import { useAutoplayHandlers } from './Carousel/hooks/useAutoplayHandlers';

interface IControls {
  emblaApi: EmblaCarouselType;
}

export const Controls: React.FC<IControls> = (props) => {
  const { emblaApi } = props;

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  const {
    onButtonAutoplayClick,
    // toggleAutoplay
  } = useAutoplayHandlers(emblaApi);

  return (
    <div className={styles.control}>
      <PrevButton
        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
        disabled={prevBtnDisabled}
      >
        <ArrowCarouselIcon />
      </PrevButton>
      <NextButton
        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
        disabled={nextBtnDisabled}
      >
        <ArrowCarouselIcon />
      </NextButton>

      <span className={styles['pagination-progressbar']}></span>
    </div>
  );
};
