import { doorCollections, doors } from './catalog';
import { COLLECTIONS } from './taxonomy';
import type { Door, DoorCollectionId, DoorListItem, DoorSpec } from './types';

export type DoorBenefitIconId =
  | 'shield'
  | 'lock'
  | 'fire'
  | 'thermometer'
  | 'sound'
  | 'seal'
  | 'mirror'
  | 'glass'
  | 'hinge'
  | 'paint'
  | 'panel'
  | 'wood'
  | 'wide'
  | 'home';

export type DoorBenefitCategoryId = 'safety' | 'climate' | 'comfort' | 'finish';

export interface DoorBenefit {
  id: string;
  label: string;
  detail: string;
  category: DoorBenefitCategoryId;
  icon: DoorBenefitIconId;
}

export interface DoorBenefitGroup {
  id: DoorBenefitCategoryId;
  label: string;
  icon: DoorBenefitIconId;
  items: DoorBenefit[];
}

export interface DoorFact {
  id: string;
  label: string;
  value: string;
}

export interface DoorFitPoint {
  id: string;
  text: string;
}

const BENEFIT_CATEGORIES: Record<
  DoorBenefitCategoryId,
  { label: string; icon: DoorBenefitIconId }
> = {
  safety: { label: 'Безопасность', icon: 'shield' },
  climate: { label: 'Тепло и тишина', icon: 'thermometer' },
  comfort: { label: 'Удобство', icon: 'home' },
  finish: { label: 'Отделка', icon: 'paint' },
};

const SECTION = {
  apartment: 87,
  house: 61,
  fire: 64,
  thermalBreak: 62,
  threeContours: 63,
  soundproof: 67,
  insulated: 68,
  burglarProof: 66,
  mirror: 56,
  glazing: 58,
  electronic: 74,
  powderCoating: 77,
  mdf: 73,
  solidWood: 76,
  doubleLeaf: 70,
} as const;

const hasSection = (door: DoorListItem, id: number) => door.sectionIds.includes(id);

const hasFeature = (door: DoorListItem, part: string) =>
  door.features.some((feature) => feature.toLowerCase().includes(part));

const blob = (door: DoorListItem) =>
  `${door.name} ${door.previewText ?? ''} ${door.sections.join(' ')} ${door.features.join(' ')}`.toLowerCase();

const isFireDoor = (door: DoorListItem) =>
  hasSection(door, SECTION.fire) || /противопожар|\bei\s?-?\s?\d|\beiw/i.test(blob(door));

const fireRating = (door: DoorListItem): string | null => {
  const match = door.name.match(/\b(EIW?)\s?-?\s?(\d{2,3})\b/i);
  if (!match) {
    return null;
  }

  return `${match[1].toUpperCase()} ${match[2]}`;
};

/** Короткое журнальное название без серии и лишних кодов. */
export const getDoorEditorialTitle = (door: DoorListItem): string => {
  let title = door.name.replace(door.series, '').trim();
  title = title.replace(/^[\s—–\-–]+/, '').trim();
  title = title.replace(/\s*№\s*\d+\s*$/i, '').trim();
  title = title.replace(/\s*\(\d+\)\s*$/i, '').trim();
  title = title.replace(/\s{2,}/g, ' ');

  if (!title || title.length < 8) {
    return door.name;
  }

  return title;
};

/** Контекстный маркер для фото: куда ставится или особый тип. */
export const getDoorMarker = (door: DoorListItem): string => {
  const rating = fireRating(door);
  if (rating) {
    return rating;
  }

  if (isFireDoor(door)) {
    return 'Противопожарная';
  }

  const collections = doorCollections(door);

  if (collections.includes('technical')) {
    return 'Техническая';
  }

  if (collections.includes('tambour')) {
    return 'Тамбур / подъезд';
  }

  if (door.flags.includes('thermalBreak') || hasSection(door, SECTION.thermalBreak)) {
    return 'Для улицы';
  }

  if (collections.includes('house') && !collections.includes('apartment')) {
    return 'Для дома';
  }

  if (collections.includes('office')) {
    return 'Офис / коммерция';
  }

  if (collections.includes('apartment') || hasSection(door, SECTION.apartment)) {
    return 'Для квартиры';
  }

  return 'Входная дверь';
};

export const getDoorUseCase = (door: DoorListItem): string => {
  const collections = doorCollections(door);

  if (isFireDoor(door)) {
    const rating = fireRating(door);
    return rating
      ? `Противопожарная дверь с пределом ${rating}`
      : 'Противопожарная дверь для эвакуационных и технических проёмов';
  }

  if (collections.includes('technical')) {
    return 'Техническая дверь для котельной, подвала, гаража или хозблока';
  }

  if (collections.includes('tambour')) {
    return 'Дверь в тамбур, подъезд или на лестничную площадку';
  }

  if (door.flags.includes('thermalBreak') || hasSection(door, SECTION.thermalBreak)) {
    return 'Уличная дверь в частный дом: с терморазрывом от промерзания';
  }

  if (collections.includes('house') && !collections.includes('apartment')) {
    return 'Входная дверь для частного дома и загородного участка';
  }

  if (collections.includes('office')) {
    return 'Входная дверь для офиса, магазина или коммерческого входа';
  }

  if (hasFeature(door, 'полуторапольные') || hasSection(door, SECTION.doubleLeaf)) {
    return 'Широкий проём: удобно заносить мебель и крупную технику';
  }

  if (collections.includes('apartment') || hasSection(door, SECTION.apartment)) {
    return 'Входная дверь в квартиру: тише и аккуратнее в подъезде';
  }

  return 'Металлическая входная дверь Legion';
};

/**
 * Подтверждённые преимущества. Только факты из секций, флагов и features —
 * без маркетинговых обещаний «на глаз».
 */
const collectDoorBenefits = (door: DoorListItem): DoorBenefit[] => {
  const benefits: DoorBenefit[] = [];
  const push = (benefit: DoorBenefit) => {
    if (!benefits.some((item) => item.id === benefit.id)) {
      benefits.push(benefit);
    }
  };

  const rating = fireRating(door);
  if (rating) {
    push({
      id: 'fire',
      category: 'safety',
      icon: 'fire',
      label: `Огнестойкость ${rating}`,
      detail:
        'Полотно рассчитано на эвакуационные и технические проёмы с требованием по огнестойкости.',
    });
  } else if (isFireDoor(door)) {
    push({
      id: 'fire',
      category: 'safety',
      icon: 'fire',
      label: 'Противопожарная конструкция',
      detail: 'Модель из противопожарной линейки — для проёмов с требованиями к огнестойкости.',
    });
  }

  if (hasSection(door, SECTION.burglarProof)) {
    push({
      id: 'burglarProof',
      category: 'safety',
      icon: 'shield',
      label: 'Усиленная защита',
      detail: 'Взломостойкая комплектация: усиленный короб, ригели и зона замков.',
    });
  }

  if (door.flags.includes('electronicLock') || hasSection(door, SECTION.electronic)) {
    push({
      id: 'electronicLock',
      category: 'safety',
      icon: 'lock',
      label: 'Электронный доступ',
      detail: 'Код, карта, отпечаток или приложение — без связки ключей на каждый день.',
    });
  }

  if (door.flags.includes('hiddenHinges')) {
    push({
      id: 'hiddenHinges',
      category: 'safety',
      icon: 'hinge',
      label: 'Скрытые петли',
      detail: 'Петли спрятаны в короб: чище фасад и сложнее снять полотно с улицы.',
    });
  }

  if (door.flags.includes('thermalBreak') || hasSection(door, SECTION.thermalBreak)) {
    push({
      id: 'thermalBreak',
      category: 'climate',
      icon: 'thermometer',
      label: 'Не промерзает на улице',
      detail: 'Терморазрыв разрывает мостик холода между наружным и внутренним металлом.',
    });
  }

  if (hasSection(door, SECTION.soundproof)) {
    push({
      id: 'soundproof',
      category: 'climate',
      icon: 'sound',
      label: 'Глушит шум подъезда',
      detail: 'Усиленная шумоизоляция: плотнее наполнение и контуры по периметру.',
    });
  }

  if (hasSection(door, SECTION.threeContours)) {
    push({
      id: 'threeContours',
      category: 'climate',
      icon: 'seal',
      label: 'Три контура от сквозняков',
      detail: 'Три уплотнения по периметру плотнее прижимают полотно к коробу.',
    });
  } else if (hasFeature(door, '2 контура')) {
    push({
      id: 'twoContours',
      category: 'climate',
      icon: 'seal',
      label: 'Два контура уплотнения',
      detail: 'Базовая герметичность для большинства квартирных проёмов.',
    });
  }

  if (hasSection(door, SECTION.insulated) && !hasSection(door, SECTION.soundproof)) {
    push({
      id: 'insulated',
      category: 'climate',
      icon: 'thermometer',
      label: 'Утеплённое полотно',
      detail: 'Внутри полотна утеплитель — дверь меньше отдаёт тепло.',
    });
  }

  if (door.flags.includes('mirror') || hasSection(door, SECTION.mirror)) {
    push({
      id: 'mirror',
      category: 'comfort',
      icon: 'mirror',
      label: 'Зеркало в полный рост',
      detail: 'Внутренняя зеркальная панель удобна перед выходом и визуально расширяет коридор.',
    });
  }

  if (hasSection(door, SECTION.glazing)) {
    push({
      id: 'glazing',
      category: 'comfort',
      icon: 'glass',
      label: 'Свет через стеклопакет',
      detail: 'Остекление в полотне пропускает свет в тамбур или холл.',
    });
  }

  if (hasFeature(door, 'полуторапольные') || hasSection(door, SECTION.doubleLeaf)) {
    push({
      id: 'wideOpening',
      category: 'comfort',
      icon: 'wide',
      label: 'Широкий проход',
      detail: 'Полуторная или двустворчатая конструкция для широкого проёма.',
    });
  }

  if (hasSection(door, SECTION.powderCoating)) {
    push({
      id: 'powderCoating',
      category: 'finish',
      icon: 'paint',
      label: 'Стойкое порошковое покрытие',
      detail: 'Наружная отделка запекается на металле — устойчива к погоде и истиранию.',
    });
  }

  if (hasSection(door, SECTION.mdf)) {
    push({
      id: 'mdf',
      category: 'finish',
      icon: 'panel',
      label: 'МДФ-панель в интерьере',
      detail: 'Внутренняя сторона с панелью МДФ — фактура и цвет под прихожую.',
    });
  }

  if (hasSection(door, SECTION.solidWood)) {
    push({
      id: 'solidWood',
      category: 'finish',
      icon: 'wood',
      label: 'Отделка массивом',
      detail: 'Премиальная деревянная панель — тактильно «живая» и статусная.',
    });
  }

  return benefits;
};

/** Дополняет преимущества фактами из specs — когда секций мало, а комплектация богатая. */
const collectBenefitsFromSpecs = (door: Door): DoorBenefit[] => {
  const benefits: DoorBenefit[] = [];
  const push = (benefit: DoorBenefit) => {
    if (!benefits.some((item) => item.id === benefit.id)) {
      benefits.push(benefit);
    }
  };

  const text = door.specs
    .flatMap((spec) => {
      if (spec.pairs) {
        return Object.entries(spec.pairs).map(([label, value]) => `${label} ${value}`);
      }
      return [`${spec.name || spec.key} ${spec.value || ''}`];
    })
    .join(' ')
    .toLowerCase();

  const hasUpperLock = /верхн[а-яё]*\s+замок/.test(text);
  const hasLowerLock = /нижн[а-яё]*\s+замок/.test(text);
  if (hasUpperLock && hasLowerLock) {
    push({
      id: 'twoLocks',
      category: 'safety',
      icon: 'lock',
      label: 'Два замка разных систем',
      detail: 'Верхний и нижний замки в комплекте — базовый уровень защиты входа.',
    });
  }

  if (/противос/.test(text)) {
    push({
      id: 'antiRemoval',
      category: 'safety',
      icon: 'shield',
      label: 'Противосъёмные блокираторы',
      detail: 'Шипы или ригели не дают снять полотно, срезав петли снаружи.',
    });
  }

  if (/р[её]бр[а-яё]*\s+жест/.test(text)) {
    push({
      id: 'stiffeners',
      category: 'safety',
      icon: 'home',
      label: 'Усиленное полотно',
      detail: 'Ребра жёсткости держат геометрию полотна и усложняют силовое воздействие.',
    });
  }

  if (/звукотепло|пенополистирол|минеральн|rockwool|knauf|ursa|утеплит/.test(text)) {
    push({
      id: 'specInsulation',
      category: 'climate',
      icon: 'thermometer',
      label: 'Шумо- и теплоизоляция',
      detail: 'Наполнение полотна снижает шум и потери тепла через дверь.',
    });
  }

  if (/двойн\w* контур|два контур|2 контур|три контур|3 контур/.test(text)) {
    push({
      id: 'specContours',
      category: 'climate',
      icon: 'seal',
      label: 'Контуры уплотнения',
      detail: 'Уплотнители по периметру плотнее прижимают полотно и режут сквозняк.',
    });
  }

  if (/ламинир|ламинат/.test(text)) {
    push({
      id: 'laminate',
      category: 'finish',
      icon: 'panel',
      label: 'Ламинированная панель',
      detail: 'Внутренняя сторона с ламинатом — практичная отделка под интерьер.',
    });
  }

  return benefits;
};

export const getDoorBenefits = (door: DoorListItem, limit = 3): DoorBenefit[] =>
  collectDoorBenefits(door).slice(0, limit);

/** Преимущества, сгруппированные по смысловым рядам (безопасность, климат и т.д.). */
export const getDoorBenefitGroups = (door: Door): DoorBenefitGroup[] => {
  const fromFlags = collectDoorBenefits(door);
  const fromSpecs = collectBenefitsFromSpecs(door);
  const benefits: DoorBenefit[] = [...fromFlags];

  for (const benefit of fromSpecs) {
    if (!benefits.some((item) => item.id === benefit.id)) {
      // Не дублируем климат/безопасность, если уже есть близкий пункт из секций.
      if (
        benefit.id === 'specInsulation' &&
        benefits.some((item) => item.category === 'climate' && item.icon === 'thermometer')
      ) {
        continue;
      }
      if (
        benefit.id === 'specContours' &&
        benefits.some((item) => item.id === 'threeContours' || item.id === 'twoContours')
      ) {
        continue;
      }
      benefits.push(benefit);
    }
  }

  const order: DoorBenefitCategoryId[] = ['safety', 'climate', 'comfort', 'finish'];

  return order
    .map((id) => {
      const items = benefits.filter((benefit) => benefit.category === id);
      if (items.length === 0) {
        return null;
      }

      return {
        id,
        label: BENEFIT_CATEGORIES[id].label,
        icon: BENEFIT_CATEGORIES[id].icon,
        items,
      };
    })
    .filter((group): group is DoorBenefitGroup => group !== null);
};

const findSpecValue = (specs: DoorSpec[], names: string[]): string | null => {
  const lowered = names.map((name) => name.toLowerCase());

  for (const spec of specs) {
    const key = (spec.name || spec.key || '').toLowerCase();
    if (!lowered.some((name) => key.includes(name))) {
      continue;
    }

    if (spec.value && spec.value.trim() && spec.value.trim() !== '-') {
      return spec.value.trim();
    }

    if (spec.pairs) {
      const first = Object.entries(spec.pairs).find(([, value]) => value && value !== '-');
      if (first) {
        return `${first[0]}: ${first[1]}`;
      }
    }
  }

  return null;
};

const findPairValue = (specs: DoorSpec[], pairName: string): string | null => {
  const needle = pairName.toLowerCase();

  for (const spec of specs) {
    if (!spec.pairs) {
      continue;
    }

    for (const [name, value] of Object.entries(spec.pairs)) {
      if (name.toLowerCase().includes(needle) && value && value !== '-') {
        return value.trim();
      }
    }
  }

  return null;
};

/** Конструктивные факты из specs — только если есть реальное значение. */
export const getDoorFacts = (door: Door): DoorFact[] => {
  const facts: DoorFact[] = [];
  const push = (id: string, label: string, value: string | null) => {
    if (value && facts.length < 6) {
      facts.push({ id, label, value });
    }
  };

  const rating = fireRating(door);
  if (rating) {
    push('rating', 'Огнестойкость', rating);
  }

  const contours =
    findPairValue(door.specs, 'количество контуров') ||
    findSpecValue(door.specs, ['количество контуров']);
  if (contours) {
    push('contours', 'Контуры уплотнения', contours);
  } else if (hasSection(door, SECTION.threeContours)) {
    push('contours', 'Контуры уплотнения', '3');
  } else if (hasFeature(door, '2 контура')) {
    push('contours', 'Контуры уплотнения', '2');
  }

  const insulation =
    findPairValue(door.specs, 'утеплитель') ||
    findSpecValue(door.specs, ['звукотеплоизоляция', 'утеплитель']);
  if (insulation && !insulation.startsWith('[')) {
    push('insulation', 'Утеплитель', insulation);
  } else if (hasSection(door, SECTION.insulated)) {
    push('insulation', 'Утеплитель', 'Есть');
  }

  const leaves =
    findPairValue(door.specs, 'количество створок') ||
    findSpecValue(door.specs, ['количество створок']);
  if (leaves) {
    push('leaves', 'Створки', leaves);
  } else if (hasSection(door, SECTION.doubleLeaf)) {
    push('leaves', 'Створки', 'Двустворчатая');
  } else if (hasFeature(door, 'полуторапольные')) {
    push('leaves', 'Створки', 'Полуторапольная');
  }

  const purpose =
    findPairValue(door.specs, 'назначение') || findSpecValue(door.specs, ['назначение']);
  if (purpose) {
    push('purpose', 'Назначение', purpose);
  }

  const outerFinish =
    findPairValue(door.specs, 'тип внешней отделки') ||
    findSpecValue(door.specs, ['тип внешней отделки']);
  if (outerFinish) {
    push('outer', 'Снаружи', outerFinish);
  }

  const innerFinish =
    findPairValue(door.specs, 'тип внутренней отделки') ||
    findSpecValue(door.specs, ['тип внутренней отделки']);
  if (innerFinish) {
    push('inner', 'Внутри', innerFinish);
  }

  const threshold = findPairValue(door.specs, 'порог');
  if (threshold) {
    push('threshold', 'Порог', threshold);
  }

  return facts;
};

export const getDoorFitPoints = (door: DoorListItem): DoorFitPoint[] => {
  const points: DoorFitPoint[] = [];
  const collections = doorCollections(door);

  if (isFireDoor(door)) {
    points.push({
      id: 'fire',
      text: 'Нужна дверь с подтверждённым пределом огнестойкости для эвакуации или технического помещения.',
    });
  }

  if (door.flags.includes('thermalBreak') || hasSection(door, SECTION.thermalBreak)) {
    points.push({
      id: 'street',
      text: 'Вход с улицы: важны терморазрыв и защита от конденсата зимой.',
    });
  } else if (collections.includes('apartment')) {
    points.push({
      id: 'apartment',
      text: 'Вход из подъезда: нужны тишина, аккуратная посадка и два замка разных систем.',
    });
  }

  if (collections.includes('house') && !door.flags.includes('thermalBreak')) {
    points.push({
      id: 'house',
      text: 'Частный дом или дача, где нужна металлическая входная дверь без избыточных опций.',
    });
  }

  if (collections.includes('technical')) {
    points.push({
      id: 'technical',
      text: 'Котельная, подвал, гараж или хозблок — важны прочность и практичная отделка.',
    });
  }

  if (collections.includes('tambour')) {
    points.push({
      id: 'tambour',
      text: 'Тамбур, подъезд или лестничная площадка с интенсивным проходом.',
    });
  }

  if (hasSection(door, SECTION.soundproof)) {
    points.push({
      id: 'quiet',
      text: 'Хотите меньше шума из подъезда или с улицы.',
    });
  }

  if (door.flags.includes('electronicLock') || hasSection(door, SECTION.electronic)) {
    points.push({
      id: 'smart',
      text: 'Удобен бесключевой доступ: код, карта или отпечаток.',
    });
  }

  if (hasFeature(door, 'нестандартные')) {
    points.push({
      id: 'custom',
      text: 'Проём нестандартный — дверь делают по замерам.',
    });
  }

  if (points.length === 0) {
    points.push({
      id: 'default',
      text: 'Нужна надёжная металлическая входная дверь с понятной комплектацией.',
    });
  }

  return points.slice(0, 4);
};

export const getCollectionPriceRange = (
  id: DoorCollectionId
): { min: number | null; max: number | null; count: number } => {
  const items = doors.filter((door) => doorCollections(door).includes(id));
  const prices = items.map((door) => door.price).filter((price): price is number => price !== null);

  return {
    count: items.length,
    min: prices.length ? Math.min(...prices) : null,
    max: prices.length ? Math.max(...prices) : null,
  };
};

export const getAllCollectionsEditorial = () =>
  COLLECTIONS.map((collection) => ({
    ...collection,
    stats: getCollectionPriceRange(collection.id),
  }));
