export type DoorCategoryId = 'apartment' | 'house';

export type DoorFlagId =
  | 'apartment'
  | 'house'
  | 'mirror'
  | 'thermalBreak'
  | 'electronicLock'
  | 'hiddenHinges';

export interface DoorSpecPairGroup {
  key: string;
  name: string;
  pairs: Record<string, string>;
  value?: never;
}

export interface DoorSpecValue {
  key: string;
  name: string;
  value: string;
  pairs?: never;
}

export type DoorSpec = DoorSpecPairGroup | DoorSpecValue;

export interface DoorImages {
  outerRemote: string | null;
  innerRemote: string | null;
  galleryRemote: string[];
  outer: string | null;
  inner: string | null;
  gallery: string[];
}

export interface Door {
  id: string;
  slug: string;
  name: string;
  series: string;
  price: number | null;
  currency: string;
  sourceUrl: string | null;
  categories: {
    apartment: boolean;
    house: boolean;
  };
  sectionIds: number[];
  features: string[];
  placement: string[];
  priceTier: string[];
  flags: DoorFlagId[];
  previewText: string | null;
  specs: DoorSpec[];
  images: DoorImages;
}

export interface CatalogData {
  source: string;
  exportedAt: string;
  categories: Array<{
    id: DoorCategoryId;
    label: string;
    sectionId: number;
  }>;
  filters: {
    features: string[];
    flags: Array<{ id: DoorFlagId; label: string }>;
  };
  items: Door[];
  stats?: {
    total: number;
    apartment: number;
    house: number;
    withPrice: number;
    minPrice: number | null;
    maxPrice: number | null;
    imagesSaved: number;
  };
}
