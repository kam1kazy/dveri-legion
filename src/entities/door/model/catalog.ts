import catalogJson from '@/entities/door/data/doors-lite.json';

import { COLLECTIONS, getDoorCollections } from './taxonomy';
import type {
  CatalogData,
  DoorCategoryId,
  DoorCollectionId,
  DoorFlagId,
  DoorListItem,
} from './types';

export const catalog = catalogJson as unknown as CatalogData<DoorListItem>;
export const doors: DoorListItem[] = catalog.items;

const collectionsByDoorId = new Map(doors.map((door) => [door.id, getDoorCollections(door)]));

export const doorCollections = (door: DoorListItem): DoorCollectionId[] =>
  collectionsByDoorId.get(door.id) ?? [];

export const doorsByCollection = (id: DoorCollectionId): DoorListItem[] =>
  doors.filter((door) => doorCollections(door).includes(id));

export const collectionCounts: Record<DoorCollectionId, number> = COLLECTIONS.reduce(
  (acc, collection) => {
    acc[collection.id] = doorsByCollection(collection.id).length;
    return acc;
  },
  {} as Record<DoorCollectionId, number>
);

export const doorSeries: string[] = [...new Set(doors.map((door) => door.series))].sort((a, b) =>
  a.localeCompare(b, 'ru')
);

const knownPrices = doors
  .map((door) => door.price)
  .filter((price): price is number => price !== null);

export const priceBounds = {
  min: knownPrices.length ? Math.min(...knownPrices) : 0,
  max: knownPrices.length ? Math.max(...knownPrices) : 0,
};

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

export const doorImage = (door: DoorListItem, kind: 'outer' | 'inner' = 'outer'): string => {
  if (kind === 'inner') {
    return door.images.inner || door.images.innerRemote || doorImage(door, 'outer');
  }

  return door.images.outer || door.images.outerRemote || '/images/catalog/art-door.png';
};
