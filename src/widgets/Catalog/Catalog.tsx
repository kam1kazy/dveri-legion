'use client';

import { useMemo, useState } from 'react';

import {
  catalog,
  CATEGORY_LABELS,
  doors,
  FLAG_LABELS,
  formatPrice,
} from '@/entities/door/model/catalog';
import type { Door, DoorCategoryId, DoorFlagId } from '@/entities/door/model/types';
import { DoorCard } from '@/entities/door/ui/DoorCard';

import styles from './Catalog.module.scss';

type CategoryFilter = 'all' | DoorCategoryId;
type SortId = 'price-asc' | 'price-desc' | 'name';

const EXTRA_FLAGS: Array<Exclude<DoorFlagId, DoorCategoryId>> = [
  'mirror',
  'thermalBreak',
  'electronicLock',
  'hiddenHinges',
];

const prices = doors.map((door) => door.price).filter((price): price is number => price !== null);
const minCatalogPrice = prices.length ? Math.min(...prices) : 0;
const maxCatalogPrice = prices.length ? Math.max(...prices) : 0;
const PRICE_STEP = 1000;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const sortDoors = (items: Door[], sort: SortId) => {
  const copy = [...items];

  copy.sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name, 'ru');
    }

    const aPrice = a.price;
    const bPrice = b.price;

    if (aPrice === null && bPrice === null) {
      return a.name.localeCompare(b.name, 'ru');
    }

    if (aPrice === null) {
      return 1;
    }

    if (bPrice === null) {
      return -1;
    }

    return sort === 'price-desc' ? bPrice - aPrice : aPrice - bPrice;
  });

  return copy;
};

export const Catalog = () => {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortId>('price-asc');
  const [priceFrom, setPriceFrom] = useState(minCatalogPrice);
  const [priceTo, setPriceTo] = useState(maxCatalogPrice);
  const [flags, setFlags] = useState<Array<Exclude<DoorFlagId, DoorCategoryId>>>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const next = doors.filter((door) => {
      if (category === 'apartment' && !door.categories.apartment) {
        return false;
      }

      if (category === 'house' && !door.categories.house) {
        return false;
      }

      if (door.price !== null && (door.price < priceFrom || door.price > priceTo)) {
        return false;
      }

      if (flags.length > 0 && !flags.every((flag) => door.flags.includes(flag))) {
        return false;
      }

      return true;
    });

    return sortDoors(next, sort);
  }, [category, flags, priceFrom, priceTo, sort]);

  const counts = useMemo(
    () => ({
      all: doors.length,
      apartment: doors.filter((door) => door.categories.apartment).length,
      house: doors.filter((door) => door.categories.house).length,
    }),
    []
  );

  const resetFilters = () => {
    setCategory('all');
    setSort('price-asc');
    setPriceFrom(minCatalogPrice);
    setPriceTo(maxCatalogPrice);
    setFlags([]);
  };

  const toggleFlag = (flag: Exclude<DoorFlagId, DoorCategoryId>) => {
    setFlags((current) =>
      current.includes(flag) ? current.filter((item) => item !== flag) : [...current, flag]
    );
  };

  const onFromChange = (value: number) => {
    const next = clamp(value, minCatalogPrice, priceTo);
    setPriceFrom(next);
  };

  const onToChange = (value: number) => {
    const next = clamp(value, priceFrom, maxCatalogPrice);
    setPriceTo(next);
  };

  return (
    <section className={styles.page}>
      <div className={`container ${styles.container}`}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Каталог Legion</p>
          <h1>Входные двери для квартиры и дома</h1>
          <p className={styles.lead}>
            {catalog.stats?.total ?? doors.length} моделей с ценами, назначением и нормальными
            фильтрами — без бесконечного списка галочек.
          </p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.tabs} role="tablist" aria-label="Категория">
            {(
              [
                ['all', 'Все', counts.all],
                ['apartment', CATEGORY_LABELS.apartment, counts.apartment],
                ['house', CATEGORY_LABELS.house, counts.house],
              ] as const
            ).map(([id, label, count]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={category === id}
                className={`${styles.tab} ${category === id ? styles.tabActive : ''}`}
                onClick={() => setCategory(id)}
              >
                {label}
                <span>{count}</span>
              </button>
            ))}
          </div>

          <div className={styles.toolbarRight}>
            <button
              type="button"
              className={styles.mobileFilters}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              {filtersOpen ? 'Скрыть фильтры' : 'Фильтры и цена'}
            </button>
            <label className={styles.sort}>
              <span>Сортировка</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortId)}>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.filterBlock}>
              <h2>Цена</h2>
              <div className={styles.priceInputs}>
                <label>
                  от
                  <input
                    type="number"
                    min={minCatalogPrice}
                    max={priceTo}
                    step={PRICE_STEP}
                    value={priceFrom}
                    onChange={(event) =>
                      onFromChange(Number(event.target.value) || minCatalogPrice)
                    }
                  />
                </label>
                <label>
                  до
                  <input
                    type="number"
                    min={priceFrom}
                    max={maxCatalogPrice}
                    step={PRICE_STEP}
                    value={priceTo}
                    onChange={(event) => onToChange(Number(event.target.value) || maxCatalogPrice)}
                  />
                </label>
              </div>
              <div className={styles.slider}>
                <div
                  className={styles.sliderFill}
                  style={{
                    left: `${((priceFrom - minCatalogPrice) / (maxCatalogPrice - minCatalogPrice || 1)) * 100}%`,
                    right: `${100 - ((priceTo - minCatalogPrice) / (maxCatalogPrice - minCatalogPrice || 1)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={minCatalogPrice}
                  max={maxCatalogPrice}
                  step={PRICE_STEP}
                  value={priceFrom}
                  aria-label="Минимальная цена"
                  onChange={(event) => onFromChange(Number(event.target.value))}
                />
                <input
                  type="range"
                  min={minCatalogPrice}
                  max={maxCatalogPrice}
                  step={PRICE_STEP}
                  value={priceTo}
                  aria-label="Максимальная цена"
                  onChange={(event) => onToChange(Number(event.target.value))}
                />
              </div>
              <p className={styles.priceHint}>
                {formatPrice(minCatalogPrice)} — {formatPrice(maxCatalogPrice)}
              </p>
            </div>

            <div className={styles.filterBlock}>
              <h2>Что важно</h2>
              <ul className={styles.checks}>
                {EXTRA_FLAGS.map((flag) => (
                  <li key={flag}>
                    <label>
                      <input
                        type="checkbox"
                        checked={flags.includes(flag)}
                        onChange={() => toggleFlag(flag)}
                      />
                      {FLAG_LABELS[flag]}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" className={styles.reset} onClick={resetFilters}>
              Сбросить всё
            </button>
          </aside>

          <div>
            <p className={styles.count}>
              Найдено {filtered.length}{' '}
              {filtered.length === 1 ? 'дверь' : filtered.length < 5 ? 'двери' : 'дверей'}
            </p>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>Под такие условия дверей нет. Сдвиньте цену или снимите пару фильтров.</p>
                <button type="button" className={styles.reset} onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((door) => (
                  <DoorCard key={door.id} door={door} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
