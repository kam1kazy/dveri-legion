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
 */
export const getCollectionPreviews = (): DoorCollectionPreview[] =>
  COLLECTIONS.map((collection) => {
    const items = doorsByCollection(collection.id);
    const withPhoto = items.filter((door) => door.images.outer);

    return {
      id: collection.id,
      title: collection.label,
      href: `/catalog?collection=${collection.id}`,
      count: items.length,
      doors: (withPhoto.length > 0 ? withPhoto : items)
        .slice(0, SLIDES_PER_COLLECTION)
        .map((door) => ({
          id: door.id,
          title: door.name.replace(door.series, '').trim() || door.name,
          href: `/catalog/${door.slug}`,
          image: doorImage(door, 'outer'),
        })),
    };
  });
