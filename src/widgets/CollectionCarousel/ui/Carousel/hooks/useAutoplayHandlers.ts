// src/widgets/CollectionCarousel/models/hooks/useAutoplayHandlers.ts
import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback } from 'react';

export function useAutoplayHandlers(emblaApi: EmblaCarouselType | undefined) {
  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) {
        return;
      }

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) {
      return;
    }

    const playOrStop = autoScroll.isPlaying() ? autoScroll.stop : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  return { onButtonAutoplayClick, toggleAutoplay };
}
