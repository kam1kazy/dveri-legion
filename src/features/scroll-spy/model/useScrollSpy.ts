'use client';

import { useEffect, useMemo, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], offset = 160) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const idsKey = useMemo(() => sectionIds.join('|'), [sectionIds]);

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : [];

    if (ids.length === 0) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
          return;
        }

        const fromTop = elements
          .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
          .filter((item) => item.top - offset <= 0)
          .sort((a, b) => b.top - a.top);

        if (fromTop[0]) {
          setActiveId(fromTop[0].id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [idsKey, offset]);

  return activeId;
};
