import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback } from 'react';

export function useOnScroll(setScrollProgress: React.Dispatch<React.SetStateAction<number>>) {
  return useCallback(
    (emblaApi: EmblaCarouselType) => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(progress * 100);
    },
    [setScrollProgress]
  );
}
