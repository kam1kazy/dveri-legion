'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const HEADER_OFFSET = 96;
const MIN_DELTA = 4;
const TOP_SHOW_Y = 8;

const getTopZoneEnd = () => {
  const zone = document.querySelector<HTMLElement>('[data-header-top-zone]');

  if (!zone) {
    return HEADER_OFFSET;
  }

  const rect = zone.getBoundingClientRect();
  return Math.max(window.scrollY + rect.bottom - HEADER_OFFSET, HEADER_OFFSET);
};

export const useHeaderScroll = (enabled = true) => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setIsHidden(false);
      return;
    }

    const update = () => {
      const y = window.scrollY;
      const last = lastY.current;
      const delta = y - last;
      const topZoneEnd = getTopZoneEnd();

      setIsFilled(y > topZoneEnd);

      if (y <= TOP_SHOW_Y) {
        setIsHidden(false);
        lastY.current = y;
      } else if (Math.abs(delta) >= MIN_DELTA) {
        setIsHidden(delta > 0);
        lastY.current = y;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) {
        return;
      }

      ticking.current = true;
      requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled, pathname]);

  return { isHidden, isFilled };
};
