import catalogJson from '@/entities/door/data/doors.json';

import type { CatalogData, Door, DoorCategoryId, DoorFlagId } from './types';

export const catalog = catalogJson as CatalogData;
export const doors: Door[] = catalog.items;

export const FLAG_LABELS: Record<Exclude<DoorFlagId, DoorCategoryId>, string> = {
  mirror: 'С зеркалом',
  thermalBreak: 'С терморазрывом',
  electronicLock: 'Электронный замок',
  hiddenHinges: 'Скрытые петли',
};

export const CATEGORY_LABELS: Record<DoorCategoryId, string> = {
  apartment: 'В квартиру',
  house: 'В дом',
};

export const formatPrice = (price: number | null, currency = '₽'): string => {
  if (price === null) {
    return 'Цена по запросу';
  }

  return `${price.toLocaleString('ru-RU')} ${currency}`;
};

export const getDoorBySlug = (slug: string): Door | undefined => {
  return doors.find((door) => door.slug === slug);
};

export const doorImage = (door: Door, kind: 'outer' | 'inner' = 'outer'): string => {
  if (kind === 'inner') {
    return (
      door.images.inner ||
      door.images.innerRemote ||
      door.images.gallery[1] ||
      door.images.galleryRemote[1] ||
      doorImage(door, 'outer')
    );
  }

  return door.images.outer || door.images.outerRemote || '/images/catalog/art-door.png';
};

export const doorGallery = (door: Door): string[] => {
  if (door.images.gallery.length > 0) {
    return door.images.gallery;
  }

  if (door.images.galleryRemote.length > 0) {
    return door.images.galleryRemote;
  }

  return [...new Set([doorImage(door, 'outer'), doorImage(door, 'inner')].filter(Boolean))];
};
