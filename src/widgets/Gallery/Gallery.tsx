'use client';

import { useEffect, useMemo, useState } from 'react';

import { CategoryNav } from '@/shared/ui/CategoryNav';
import { Image } from '@/shared/ui/Image/Image';
import { PageIntro } from '@/shared/ui/PageIntro';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import style from './Gallery.module.scss';
import { galleryCategories, galleryItems, galleryPage } from './config/gallery';

export const Gallery = () => {
  const [activeId, setActiveId] = useState('all');
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const navItems = useMemo(
    () => galleryCategories.map((category) => ({ id: category.id, label: category.label })),
    []
  );

  const visibleItems = useMemo(() => {
    if (activeId === 'all') {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.categoryId === activeId);
  }, [activeId]);

  const lightboxItem = useMemo(
    () => galleryItems.find((item) => item.id === lightboxId) ?? null,
    [lightboxId]
  );

  useEffect(() => {
    if (!lightboxId) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxId(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxId]);

  return (
    <>
      <section className={style.gallery}>
        <div className={`container ${style.shell}`}>
          <PageIntro title={galleryPage.title} description={galleryPage.description} />

          <CategoryNav items={navItems} activeId={activeId} onSelect={setActiveId} />

          {visibleItems.length > 0 ? (
            <div className={style.grid}>
              {visibleItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={style.card}
                  onClick={() => setLightboxId(item.id)}
                  aria-label={`Открыть фото: ${item.alt}`}
                >
                  <Image
                    className={style.image}
                    src={item.src}
                    alt={item.alt}
                    width={450}
                    height={450}
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className={style.empty}>В этой категории пока нет фотографий.</p>
          )}
        </div>
      </section>

      {lightboxItem && (
        <div
          className={style.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.alt}
          onClick={() => setLightboxId(null)}
        >
          <div className={style.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={style.lightboxClose}
              onClick={() => setLightboxId(null)}
            >
              Закрыть
            </button>
            <Image
              className={style.lightboxImage}
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              width={900}
              height={900}
            />
          </div>
        </div>
      )}

      <ContactArea />
    </>
  );
};
