import { doorImage, doorsByCollection } from './catalog';
import { COLLECTIONS } from './taxonomy';
import type { DoorCollectionId } from './types';

export interface DoorCollectionSlide {
  id: string;
  title: string;
  href: string;
  image: string;
}

export interface DoorCollectionPreview {
  id: DoorCollectionId;
  title: string;
  href: string;
  count: number;
  doors: DoorCollectionSlide[];
}

const SLIDES_PER_COLLECTION = 9;

/**
 * Собирается в серверном компоненте и уезжает в шапку пропсами, чтобы
 * каталог не попадал в клиентский бандл на каждой странице.
 * Картинки не пересекаются между коллекциями: одна дверь — только в одном превью.
 */
export const getCollectionPreviews = (): DoorCollectionPreview[] => {
  const usedDoorIds = new Set<string>();
  const usedImages = new Set<string>();

  return COLLECTIONS.map((collection) => {
    const items = doorsByCollection(collection.id);
    const withPhoto = items.filter((door) => door.images.outer);
    const pool = withPhoto.length > 0 ? withPhoto : items;
    const doors: DoorCollectionSlide[] = [];

    for (const door of pool) {
      if (doors.length >= SLIDES_PER_COLLECTION) {
        break;
      }

      const image = doorImage(door, 'outer');
      if (usedDoorIds.has(door.id) || usedImages.has(image)) {
        continue;
      }

      usedDoorIds.add(door.id);
      usedImages.add(image);
      doors.push({
        id: door.id,
        title: door.name.replace(door.series, '').trim() || door.name,
        href: `/catalog/${door.slug}`,
        image,
      });
    }

    return {
      id: collection.id,
      title: collection.label,
      href: `/catalog?collection=${collection.id}`,
      count: items.length,
      doors,
    };
  });
};
