export {
  catalog,
  CATEGORY_LABELS,
  collectionCounts,
  doorCollections,
  doorImage,
  doors,
  doorsByCollection,
  doorSeries,
  FLAG_LABELS,
  formatPrice,
  priceBounds,
} from './model/catalog';
export type { DoorCollectionPreview, DoorCollectionSlide } from './model/collectionPreviews';
export { getCollectionPreviews } from './model/collectionPreviews';
export type { FilterHint } from './model/filterHints';
export { FILTER_HINTS } from './model/filterHints';
export type {
  DoorBenefit,
  DoorBenefitCategoryId,
  DoorBenefitGroup,
  DoorBenefitIconId,
  DoorFact,
  DoorFitPoint,
} from './model/presentation';
export {
  getAllCollectionsEditorial,
  getCollectionPriceRange,
  getDoorBenefitGroups,
  getDoorBenefits,
  getDoorEditorialTitle,
  getDoorFacts,
  getDoorFitPoints,
  getDoorMarker,
  getDoorUseCase,
} from './model/presentation';
export type { DoorSpecRow, DoorSpecTab, DoorSpecTabId } from './model/specTabs';
export { getDoorSpecTabs } from './model/specTabs';
export type { DoorCollection, DoorFilter, DoorFilterGroup } from './model/taxonomy';
export {
  ALL_DOORS_EDITORIAL,
  COLLECTIONS,
  FILTER_GROUPS,
  getDoorCollections,
  matchesFilter,
} from './model/taxonomy';
export type { Door, DoorCollectionId, DoorFlagId, DoorListItem, DoorSpec } from './model/types';
export { DoorCard } from './ui/DoorCard';
