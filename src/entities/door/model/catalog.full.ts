import catalogJson from '@/entities/door/data/doors.json';

import { doorImage } from './catalog';
import type { CatalogData, Door } from './types';

/**
 * Полный каталог с характеристиками и галереей. Весит в разы больше
 * облегчённого набора, поэтому импортируется только в серверных компонентах
 * (страница товара), а не в клиентском листинге.
 */
export const fullCatalog = catalogJson as unknown as CatalogData<Door>;
export const allDoors: Door[] = fullCatalog.items;

export const getDoorBySlug = (slug: string): Door | undefined =>
  allDoors.find((door) => door.slug === slug);

export const doorGallery = (door: Door): string[] => {
  if (door.images.gallery.length > 0) {
    return door.images.gallery;
  }

  if (door.images.galleryRemote.length > 0) {
    return door.images.galleryRemote;
  }

  return [...new Set([doorImage(door, 'outer'), doorImage(door, 'inner')].filter(Boolean))];
};
