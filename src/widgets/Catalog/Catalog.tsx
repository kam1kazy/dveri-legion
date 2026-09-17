'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { DoorCollectionId, DoorListItem } from '@/entities/door';
import {
  catalog,
  COLLECTIONS,
  DoorCard,
  doorCollections,
  doors,
  doorSeries,
  FILTER_GROUPS,
  formatPrice,
  matchesFilter,
  priceBounds,
} from '@/entities/door';
import { plural } from '@/shared/lib/plural';
import { CategoryNav } from '@/shared/ui/CategoryNav';
import { Checkbox } from '@/shared/ui/Checkbox';
import { PageIntro } from '@/shared/ui/PageIntro';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import styles from './Catalog.module.scss';

type CollectionFilter = 'all' | DoorCollectionId;
type SortId = 'price-asc' | 'price-desc' | 'name';

const PRICE_STEP = 1000;
const PRICE_TIERS = ['Бизнес', 'Премиум'];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isCollectionId = (value: string | null): value is DoorCollectionId =>
  COLLECTIONS.some((collection) => collection.id === value);

const sortDoors = (items: DoorListItem[], sort: SortId) => {
  const copy = [...items];

  copy.sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name, 'ru');
    }

    if (a.price === null && b.price === null) {
      return a.name.localeCompare(b.name, 'ru');
    }

    if (a.price === null) {
      return 1;
    }

    if (b.price === null) {
      return -1;
    }

    return sort === 'price-desc' ? b.price - a.price : a.price - b.price;
  });

  return copy;
};

export const Catalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get('collection');
  const collection: CollectionFilter = isCollectionId(collectionParam) ? collectionParam : 'all';

  const [sort, setSort] = useState<SortId>('price-asc');
  const [priceFrom, setPriceFrom] = useState(priceBounds.min);
  const [priceTo, setPriceTo] = useState(priceBounds.max);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tiers, setTiers] = useState<string[]>([]);
  const [series, setSeries] = useState<string>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const inCollection = useMemo(
    () =>
      collection === 'all'
        ? doors
        : doors.filter((door) => doorCollections(door).includes(collection)),
    [collection]
  );

  const filtered = useMemo(() => {
    const next = inCollection.filter((door) => {
      if (door.price !== null && (door.price < priceFrom || door.price > priceTo)) {
        return false;
      }

      if (series !== 'all' && door.series !== series) {
        return false;
      }

      if (tiers.length > 0 && !tiers.some((tier) => door.priceTier.includes(tier))) {
        return false;
      }

      return activeFilters.every((id) => matchesFilter(door, id));
    });

    return sortDoors(next, sort);
  }, [activeFilters, inCollection, priceFrom, priceTo, series, sort, tiers]);

  const navItems = useMemo(
    () => [
      { id: 'all', label: `Все двери · ${doors.length}` },
      ...COLLECTIONS.map((item) => ({
        id: item.id,
        label: `${item.label} · ${doors.filter((door) => doorCollections(door).includes(item.id)).length}`,
      })),
    ],
    []
  );

  const activeCollection = COLLECTIONS.find((item) => item.id === collection);

  const selectCollection = (id: string) => {
    const query = id === 'all' ? '/catalog' : `/catalog?collection=${id}`;
    router.replace(query, { scroll: false });
  };

  const resetFilters = () => {
    setSort('price-asc');
    setPriceFrom(priceBounds.min);
    setPriceTo(priceBounds.max);
    setActiveFilters([]);
    setTiers([]);
    setSeries('all');
  };

  const toggleFilter = (id: string) => {
    setActiveFilters((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const toggleTier = (tier: string) => {
    setTiers((current) =>
      current.includes(tier) ? current.filter((item) => item !== tier) : [...current, tier]
    );
  };

  return (
    <>
      <section className={styles.page}>
        <div className={`container ${styles.container}`}>
          <PageIntro
            title="Каталог входных дверей"
            description={`${catalog.stats?.total ?? doors.length} моделей с ценами. Выберите, куда нужна дверь, — остальное отфильтруем.`}
          />

          <CategoryNav items={navItems} activeId={collection} onSelect={selectCollection} />

          {activeCollection && <p className={styles.lead}>{activeCollection.description}</p>}

          <div className={styles.toolbar}>
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

          <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
              <div className={styles.filterBlock}>
                <h2>Цена</h2>
                <div className={styles.priceInputs}>
                  <label>
                    от
                    <input
                      type="number"
                      min={priceBounds.min}
                      max={priceTo}
                      step={PRICE_STEP}
                      value={priceFrom}
                      onChange={(event) =>
                        setPriceFrom(
                          clamp(
                            Number(event.target.value) || priceBounds.min,
                            priceBounds.min,
                            priceTo
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    до
                    <input
                      type="number"
                      min={priceFrom}
                      max={priceBounds.max}
                      step={PRICE_STEP}
                      value={priceTo}
                      onChange={(event) =>
                        setPriceTo(
                          clamp(
                            Number(event.target.value) || priceBounds.max,
                            priceFrom,
                            priceBounds.max
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <div className={styles.slider}>
                  <div
                    className={styles.sliderFill}
                    style={{
                      left: `${((priceFrom - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
                      right: `${100 - ((priceTo - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={PRICE_STEP}
                    value={priceFrom}
                    aria-label="Минимальная цена"
                    onChange={(event) =>
                      setPriceFrom(clamp(Number(event.target.value), priceBounds.min, priceTo))
                    }
                  />
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={PRICE_STEP}
                    value={priceTo}
                    aria-label="Максимальная цена"
                    onChange={(event) =>
                      setPriceTo(clamp(Number(event.target.value), priceFrom, priceBounds.max))
                    }
                  />
                </div>
                <p className={styles.priceHint}>
                  {formatPrice(priceFrom)} — {formatPrice(priceTo)}
                </p>
              </div>

              <div className={styles.filterBlock}>
                <h2>Сегмент</h2>
                <ul className={styles.checks}>
                  {PRICE_TIERS.map((tier) => (
                    <li key={tier}>
                      <Checkbox
                        id={`tier-${tier}`}
                        label={tier}
                        checked={tiers.includes(tier)}
                        onChange={() => toggleTier(tier)}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {FILTER_GROUPS.map((group) => {
                const available = group.filters.filter((filter) =>
                  inCollection.some((door) => filter.match(door))
                );

                if (available.length === 0) {
                  return null;
                }

                return (
                  <div key={group.id} className={styles.filterBlock}>
                    <h2>{group.label}</h2>
                    <ul className={styles.checks}>
                      {available.map((filter) => (
                        <li key={filter.id}>
                          <Checkbox
                            id={`filter-${filter.id}`}
                            label={filter.label}
                            checked={activeFilters.includes(filter.id)}
                            onChange={() => toggleFilter(filter.id)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              <div className={styles.filterBlock}>
                <h2>Серия</h2>
                <select
                  className={styles.seriesSelect}
                  value={series}
                  onChange={(event) => setSeries(event.target.value)}
                >
                  <option value="all">Все серии</option>
                  {doorSeries.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className={styles.reset} onClick={resetFilters}>
                Сбросить всё
              </button>
            </aside>

            <div>
              <p className={styles.count}>
                Найдено {filtered.length} {plural(filtered.length, 'дверь', 'двери', 'дверей')}
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

      <ContactArea />
    </>
  );
};
