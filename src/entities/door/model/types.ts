export type DoorCategoryId = 'apartment' | 'house';

export type DoorCollectionId = 'apartment' | 'house' | 'technical' | 'fire' | 'office' | 'tambour';

export type DoorFlagId =
  | 'apartment'
  | 'house'
  | 'mirror'
  | 'thermalBreak'
  | 'electronicLock'
  | 'hiddenHinges';

export interface DoorOption {
  id: string;
  label: string;
  slug: string;
}

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

export interface DoorPreviewImages {
  outerRemote: string | null;
  innerRemote: string | null;
  outer: string | null;
  inner: string | null;
}

export interface DoorImages extends DoorPreviewImages {
  galleryRemote: string[];
  gallery: string[];
}

/** Данных этого объёма хватает для каталога, фильтров и карточки в сетке. */
export interface DoorListItem {
  id: string;
  slug: string;
  name: string;
  series: string;
  price: number | null;
  currency: string;
  categories: {
    apartment: boolean;
    house: boolean;
  };
  sectionIds: number[];
  sections: string[];
  features: string[];
  placement: string[];
  priceTier: string[];
  flags: DoorFlagId[];
  previewText: string | null;
  images: DoorPreviewImages;
}

export interface Door extends DoorListItem {
  sourceUrl: string | null;
  specs: DoorSpec[];
  images: DoorImages;
}

export interface CatalogData<TItem = Door> {
  items: TItem[];
  source: string;
  exportedAt: string;
  categories: Array<{
    id: DoorCategoryId;
    label: string;
    sectionId: number;
  }>;
  options?: {
    sections: DoorOption[];
    placement: DoorOption[];
    features: DoorOption[];
    priceTier: DoorOption[];
  };
  filters: {
    features: string[];
    flags: Array<{ id: DoorFlagId; label: string }>;
  };
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
