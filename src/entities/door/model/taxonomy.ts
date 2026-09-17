import type { DoorCollectionId, DoorListItem } from './types';

export interface DoorCollection {
  id: DoorCollectionId;
  label: string;
  description: string;
}

export interface DoorFilter {
  id: string;
  label: string;
  match: (door: DoorListItem) => boolean;
}

export interface DoorFilterGroup {
  id: string;
  label: string;
  filters: DoorFilter[];
}

/**
 * Секции Bitrix у Legion смешивают назначение двери с отделкой, а PLACEMENT
 * проставлен неаккуратно (метка «Для офиса» висит и на квартирных дверях).
 * Поэтому назначение выводим сами: по секции, названию и описанию.
 */
const SECTION = {
  house: 61,
  apartment: 87,
  fire: 64,
  mirror: 56,
  glazing: 58,
  premium: 59,
  thermalBreak: 62,
  threeContours: 63,
  burglarProof: 66,
  soundproof: 67,
  insulated: 68,
  doubleLeaf: 70,
  light: 71,
  dark: 72,
  mdf: 73,
  electronic: 74,
  solidWood: 76,
  powderCoating: 77,
  laminate: 78,
  loft: 79,
  forged: 80,
  panelled: 81,
  laserCut: 82,
  embossed: 85,
} as const;

const FIRE_RE = /противопожар|\bei\s?-?\s?\d|\beiw/;
const TECHNICAL_RE = /техническ|котельн|подвал|сара|хозблок|склад|гараж|промышленн|антивандальн/;
const TAMBOUR_RE = /тамбур|подъезд|лестничн|общий коридор/;
const OFFICE_RE = /офис|бар|кафе|рестора|магазин|лифтов/;
const HOUSE_RE = /\bв дом|для дома|коттедж|загородн|веранд|террас|бан[иья]/;

export const COLLECTIONS: DoorCollection[] = [
  {
    id: 'apartment',
    label: 'В квартиру',
    description: 'Входные двери на квартиру: тише, компактный короб, два замка разных систем.',
  },
  {
    id: 'house',
    label: 'В дом',
    description: 'Для частного дома и улицы: терморазрыв, несколько контуров, усиленное утепление.',
  },
  {
    id: 'tambour',
    label: 'Тамбурные и подъездные',
    description: 'Двери в тамбур, подъезд и на лестничную площадку.',
  },
  {
    id: 'technical',
    label: 'Технические',
    description: 'Котельные, подвалы, склады, гаражи и хозблоки.',
  },
  {
    id: 'fire',
    label: 'Противопожарные',
    description: 'Двери с пределом огнестойкости EI и EIW.',
  },
  {
    id: 'office',
    label: 'Офис и коммерция',
    description: 'Парадные и входные двери для офисов, магазинов и заведений.',
  },
];

const searchableText = (door: DoorListItem) =>
  `${door.name} ${door.previewText ?? ''}`.toLowerCase();

const hasSection = (door: DoorListItem, id: number) => door.sectionIds.includes(id);

const hasFeature = (door: DoorListItem, part: string) =>
  door.features.some((feature) => feature.toLowerCase().includes(part));

export const getDoorCollections = (door: DoorListItem): DoorCollectionId[] => {
  const text = searchableText(door);
  const tagged = `${text} ${door.sections.join(' ')} ${door.placement.join(' ')}`.toLowerCase();
  const found = new Set<DoorCollectionId>();

  if (hasSection(door, SECTION.fire) || FIRE_RE.test(tagged) || /fire/i.test(door.series)) {
    found.add('fire');
  }

  if (TECHNICAL_RE.test(tagged)) {
    found.add('technical');
  }

  if (TAMBOUR_RE.test(tagged)) {
    found.add('tambour');
  }

  if (OFFICE_RE.test(text)) {
    found.add('office');
  }

  if (hasSection(door, SECTION.apartment) || text.includes('квартир')) {
    found.add('apartment');
  }

  if (hasSection(door, SECTION.house) || HOUSE_RE.test(text)) {
    found.add('house');
  }

  // Часть моделей размечена только отделкой. Это обычные входные двери:
  // с терморазрывом их берут в дом, остальные — в квартиру.
  const onlyOffice = found.size === 0 || (found.size === 1 && found.has('office'));

  if (onlyOffice) {
    found.add(door.flags.includes('thermalBreak') ? 'house' : 'apartment');
  }

  return COLLECTIONS.map((collection) => collection.id).filter((id) => found.has(id));
};

export const FILTER_GROUPS: DoorFilterGroup[] = [
  {
    id: 'construction',
    label: 'Конструкция',
    filters: [
      {
        id: 'thermalBreak',
        label: 'С терморазрывом',
        match: (door) =>
          door.flags.includes('thermalBreak') || hasSection(door, SECTION.thermalBreak),
      },
      {
        id: 'threeContours',
        label: 'Три контура уплотнения',
        match: (door) => hasSection(door, SECTION.threeContours),
      },
      {
        id: 'twoContours',
        label: 'Два контура уплотнения',
        match: (door) => hasFeature(door, '2 контура'),
      },
      {
        id: 'insulated',
        label: 'Утеплённые',
        match: (door) => hasSection(door, SECTION.insulated),
      },
      {
        id: 'soundproof',
        label: 'Шумоизоляционные',
        match: (door) => hasSection(door, SECTION.soundproof),
      },
      {
        id: 'burglarProof',
        label: 'Взломостойкие',
        match: (door) => hasSection(door, SECTION.burglarProof),
      },
      {
        id: 'hiddenHinges',
        label: 'Скрытые петли',
        match: (door) => door.flags.includes('hiddenHinges'),
      },
    ],
  },
  {
    id: 'appearance',
    label: 'Отделка и внешний вид',
    filters: [
      {
        id: 'powderCoating',
        label: 'Порошковое напыление',
        match: (door) => hasSection(door, SECTION.powderCoating),
      },
      { id: 'mdf', label: 'МДФ-панели', match: (door) => hasSection(door, SECTION.mdf) },
      { id: 'laminate', label: 'Ламинат', match: (door) => hasSection(door, SECTION.laminate) },
      {
        id: 'solidWood',
        label: 'Массив дерева',
        match: (door) => hasSection(door, SECTION.solidWood),
      },
      { id: 'light', label: 'Светлые', match: (door) => hasSection(door, SECTION.light) },
      { id: 'dark', label: 'Тёмные', match: (door) => hasSection(door, SECTION.dark) },
      {
        id: 'mirror',
        label: 'С зеркалом',
        match: (door) => door.flags.includes('mirror') || hasSection(door, SECTION.mirror),
      },
      {
        id: 'glazing',
        label: 'Со стеклопакетом',
        match: (door) => hasSection(door, SECTION.glazing),
      },
      { id: 'forged', label: 'С ковкой', match: (door) => hasSection(door, SECTION.forged) },
      {
        id: 'embossed',
        label: 'С выдавленным рисунком',
        match: (door) => hasSection(door, SECTION.embossed),
      },
      {
        id: 'laserCut',
        label: 'С лазерной резкой',
        match: (door) => hasSection(door, SECTION.laserCut),
      },
      {
        id: 'panelled',
        label: 'Филенчатые',
        match: (door) => hasSection(door, SECTION.panelled),
      },
      { id: 'loft', label: 'В стиле LOFT', match: (door) => hasSection(door, SECTION.loft) },
    ],
  },
  {
    id: 'options',
    label: 'Опции',
    filters: [
      {
        id: 'electronicLock',
        label: 'Электронный замок',
        match: (door) =>
          door.flags.includes('electronicLock') || hasSection(door, SECTION.electronic),
      },
      { id: 'arched', label: 'Арочные', match: (door) => hasFeature(door, 'арочные') },
      {
        id: 'doubleLeaf',
        label: 'Двустворчатые',
        match: (door) => hasSection(door, SECTION.doubleLeaf),
      },
      {
        id: 'oneAndHalf',
        label: 'Полуторапольные',
        match: (door) => hasFeature(door, 'полуторапольные'),
      },
      { id: 'transom', label: 'С фрамугой', match: (door) => hasFeature(door, 'фрамуг') },
      {
        id: 'nonStandard',
        label: 'Нестандартный размер',
        match: (door) => hasFeature(door, 'нестандартные'),
      },
      {
        id: 'premium',
        label: 'Премиум-сегмент',
        match: (door) => hasSection(door, SECTION.premium),
      },
    ],
  },
];

const FILTER_INDEX = new Map(
  FILTER_GROUPS.flatMap((group) => group.filters).map((filter) => [filter.id, filter])
);

export const matchesFilter = (door: DoorListItem, filterId: string): boolean => {
  const filter = FILTER_INDEX.get(filterId);
  return filter ? filter.match(door) : true;
};
