'use client';

import NextImage from 'next/image';
import { useState } from 'react';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [active, setActive] = useState(0);
  const current = images[active] || images[0];

  if (!current) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <NextImage src={current} alt={alt} width={640} height={1280} priority />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={`${styles.thumb} ${index === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Фото ${index + 1}`}
            >
              <NextImage src={src} alt="" width={120} height={240} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
