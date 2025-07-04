import { EmblaCarouselType } from 'embla-carousel';
import { useCallback } from 'react';

export function useSlidesInView(setSlidesInView: React.Dispatch<React.SetStateAction<number[]>>) {
  const updateSlidesInView = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setSlidesInView((slidesInView) => {
        if (slidesInView.length === emblaApi.slideNodes().length) {
          emblaApi.off('slidesInView', updateSlidesInView);
        }
        const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index));
        return slidesInView.concat(inView);
      });
    },
    [setSlidesInView]
  );
  return updateSlidesInView;
}
