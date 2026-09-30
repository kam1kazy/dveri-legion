import type { Door, DoorSpec } from './types';

export type DoorSpecTabId =
  | 'construction'
  | 'security'
  | 'insulation'
  | 'finish'
  | 'sizes'
  | 'other';

export interface DoorSpecRow {
  label: string;
  value: string;
}

export interface DoorSpecTab {
  id: DoorSpecTabId;
  label: string;
  rows: DoorSpecRow[];
}

const TAB_META: Record<DoorSpecTabId, { label: string; order: number }> = {
  construction: { label: 'Конструкция', order: 0 },
  security: { label: 'Замки и защита', order: 1 },
  insulation: { label: 'Утепление', order: 2 },
  finish: { label: 'Отделка', order: 3 },
  sizes: { label: 'Размеры', order: 4 },
  other: { label: 'Дополнительно', order: 5 },
};

const GROUP_KEY_TO_TAB: Record<string, DoorSpecTabId> = {
  konstruktsiya: 'construction',
  konstruktiv: 'construction',
  osobennosti_konstruktsii: 'construction',
  furnitura: 'security',
  zamkovaya_chast: 'security',
  zamkovaya_sistema: 'security',
  otdelka: 'finish',
  otdelka_dveri: 'finish',
  razmery: 'sizes',
  dopolnitelno: 'other',
  dopolnitelnye_optsii: 'other',
  dopolnitelno_k_komplektatsii: 'other',
  dopolnitelno_k_bazovoy_komplektatsii: 'other',
  osnovnye_dopolnitelnye_optsii: 'other',
  a_takzhe: 'other',
  servis: 'other',
  korobka_karkas_dveri_: 'construction',
  polotno_dveri: 'construction',
  zvukoteploizolyatsiya: 'insulation',
  udobstvo_ekspluatatsii: 'other',
  fizicheskie_kharakteristiki: 'construction',
  oblast_primeneniya: 'other',
};

const classifyByText = (text: string): DoorSpecTabId => {
  const value = text.toLowerCase();

  if (
    /замк|ригел|брон|девиатор|задвиж|глазок|противос|блокиратор|фурнитур|ручк|щит|взлом|антипаник|ключ/.test(
      value
    )
  ) {
    return 'security';
  }

  if (
    /утеплит|терморазрыв|уплотн|контур|шум|теплоизоля|минеральн|пенопласт|rockwool|knauf|ursa/.test(
      value
    )
  ) {
    return 'insulation';
  }

  if (
    /отделк|цвет|рисунок|покраск|порошков|ламинат|мдф|mdf|панел|наличник|массив|пвх/.test(value)
  ) {
    return 'finish';
  }

  if (/размер|толщин|глубин|створ|сторон|порог|вес|мм\b|изготавливаем/.test(value)) {
    return 'sizes';
  }

  if (
    /короб|полотн|сталь|р[её]бр|каркас|конструкц|профиль|лист металла|антикорроз|петл|петел|притвор|упаковк/.test(
      value
    )
  ) {
    return 'construction';
  }

  if (/сери|модель|назначен/.test(value)) {
    return 'construction';
  }

  return 'other';
};

const cleanValue = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '-') {
    return null;
  }

  return trimmed;
};

const parseListValue = (value: string): string[] | null => {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[')) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed.map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    return null;
  }

  return null;
};

const pushRow = (buckets: Map<DoorSpecTabId, DoorSpecRow[]>, tab: DoorSpecTabId, row: DoorSpecRow) => {
  const value = cleanValue(row.value);
  if (!value) {
    return;
  }

  const list = buckets.get(tab) ?? [];
  if (list.some((item) => item.label === row.label && item.value === value)) {
    return;
  }

  list.push({ label: row.label, value });
  buckets.set(tab, list);
};

const flattenSpec = (spec: DoorSpec): DoorSpecRow[] => {
  if (spec.pairs) {
    return Object.entries(spec.pairs)
      .map(([label, value]) => ({ label, value }))
      .filter((row) => cleanValue(row.value));
  }

  if (!spec.value) {
    return [];
  }

  const list = parseListValue(spec.value);
  if (list) {
    return [{ label: spec.name || spec.key, value: list.join('\n') }];
  }

  return [{ label: spec.name || spec.key, value: spec.value }];
};

/** Раскладывает specs по смысловым вкладкам. */
export const getDoorSpecTabs = (door: Door): DoorSpecTab[] => {
  const buckets = new Map<DoorSpecTabId, DoorSpecRow[]>();

  for (const spec of door.specs) {
    const rows = flattenSpec(spec);
    if (rows.length === 0) {
      continue;
    }

    const groupTab = GROUP_KEY_TO_TAB[spec.key];

    // Крупные «свалки» вроде «что входит в стоимость» — режем по смыслу каждой строки.
    const isCatchAll =
      spec.key.includes('stoimost') ||
      spec.key === 'konstruktsiya' ||
      spec.key === 'dopolnitelno' ||
      (!groupTab && rows.length > 4 && Boolean(spec.pairs));

    for (const row of rows) {
      let tab: DoorSpecTabId;

      if (isCatchAll) {
        tab = classifyByText(`${row.label} ${row.value}`);
      } else if (groupTab) {
        // Внутри «Конструкция» утепление выносим отдельно.
        if (groupTab === 'construction') {
          const pairTab = classifyByText(`${row.label} ${row.value}`);
          tab = pairTab === 'insulation' || pairTab === 'security' ? pairTab : groupTab;
        } else {
          tab = groupTab;
        }
      } else {
        tab = classifyByText(`${spec.name || spec.key} ${row.label} ${row.value}`);
      }

      pushRow(buckets, tab, row);
    }
  }

  return ([...buckets.entries()] as Array<[DoorSpecTabId, DoorSpecRow[]]>)
    .filter(([, rows]) => rows.length > 0)
    .sort((a, b) => TAB_META[a[0]].order - TAB_META[b[0]].order)
    .map(([id, rows]) => ({
      id,
      label: TAB_META[id].label,
      rows,
    }));
};
