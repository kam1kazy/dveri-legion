'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, type ReactNode } from 'react';

import type { DoorCollectionId, DoorListItem } from '@/entities/door';
import {
  catalog,
  COLLECTIONS,
  DoorCard,
  doorCollections,
  doors,
  doorSeries,
  FILTER_GROUPS,
  FILTER_HINTS,
  formatPrice,
  matchesFilter,
  priceBounds,
} from '@/entities/door';
import { plural } from '@/shared/lib/plural';
import { CategoryNav } from '@/shared/ui/CategoryNav';
import { Checkbox } from '@/shared/ui/Checkbox';
import { InfoHint } from '@/shared/ui/InfoHint';
import { PageIntro } from '@/shared/ui/PageIntro';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import styles from './Catalog.module.scss';

type CollectionFilter = 'all' | DoorCollectionId;
type SortId = 'price-asc' | 'price-desc' | 'name';

const PRICE_STEP = 1000;
const PRICE_TIERS = ['Бизнес', 'Премиум'];
const SORT_ORDER: SortId[] = ['price-asc', 'price-desc', 'name'];
const SORT_LABELS: Record<SortId, string> = {
  'price-asc': 'Сначала дешёвые',
  'price-desc': 'Сначала дорогие',
  name: 'По названию',
};

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

const SortIcon = ({ sort }: { sort: SortId }) => {
  if (sort === 'name') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          d="M8 4H6.5L3 14h1.6l.7-2h3.4l.7 2H11L7.5 4H8zm-2.2 6.5L7 6.2l1.2 4.3H5.8zM14 4v2h4.2l-4.5 8.5V16H20v-2h-4.1L20.4 6V4H14z"
          fill="currentColor"
        />
      </svg>
    );
  }

  const ascending = sort === 'price-asc';

  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        d={
          ascending
            ? 'M4 18h4v-2H4v2zm0-5h7v-2H4v2zm0-5h10V6H4v2zm13.5 9.5L14 14h2.5V5H18v9h2.5L17.5 17.5z'
            : 'M4 6h4v2H4V6zm0 5h7v2H4v-2zm0 5h10v2H4v-2zm13.5-9.5L21 10h-2.5v9H17V10h-2.5l3-3.5z'
        }
        fill="currentColor"
      />
    </svg>
  );
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
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

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

  const toggleGroup = (id: string) => {
    setCollapsedGroups((current) => ({ ...current, [id]: !current[id] }));
  };

  const cycleSort = () => {
    const index = SORT_ORDER.indexOf(sort);
    setSort(SORT_ORDER[(index + 1) % SORT_ORDER.length]);
  };

  const renderGroup = (id: string, label: string, children: ReactNode) => {
    const collapsed = Boolean(collapsedGroups[id]);
    const hint = FILTER_HINTS[id];

    return (
      <div key={id} className={styles.filterBlock}>
        <div className={styles.groupHeader}>
          <button
            type="button"
            className={styles.groupTitle}
            onClick={() => toggleGroup(id)}
            aria-expanded={!collapsed}
          >
            {label}
          </button>
          {hint && (
            <InfoHint
              label={label}
              description={hint.description}
              pros={hint.pros}
              cons={hint.cons}
            />
          )}
          <button
            type="button"
            className={styles.groupToggle}
            onClick={() => toggleGroup(id)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? `Развернуть «${label}»` : `Свернуть «${label}»`}
          >
            <svg
              className={`${styles.groupChevron} ${collapsed ? styles.groupChevronCollapsed : ''}`}
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {!collapsed && children}
      </div>
    );
  };

  const renderCheck = (
    id: string,
    label: string,
    checked: boolean,
    onChange: () => void,
    inputId?: string
  ) => {
    const hint = FILTER_HINTS[id];

    return (
      <li key={id} className={styles.checkRow}>
        <Checkbox
          id={inputId ?? `filter-${id}`}
          label={label}
          checked={checked}
          onChange={onChange}
        />
        {hint && (
          <InfoHint
            label={label}
            description={hint.description}
            pros={hint.pros}
            cons={hint.cons}
          />
        )}
      </li>
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
        </div>

        <div className={styles.categoryBar}>
          <div className="container">
            <CategoryNav
              items={navItems}
              activeId={collection}
              onSelect={selectCollection}
              sticky={false}
            />
          </div>
        </div>

        <div className={`container ${styles.container}`}>
          {activeCollection && <p className={styles.lead}>{activeCollection.description}</p>}

          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.mobileFilters}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              {filtersOpen ? 'Скрыть фильтры' : 'Фильтры и цена'}
            </button>
          </div>

          <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
              {renderGroup(
                'price',
                'Цена',
                <>
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
                </>
              )}

              {renderGroup(
                'tier',
                'Сегмент',
                <ul className={styles.checks}>
                  {PRICE_TIERS.map((tier) =>
                    renderCheck(tier, tier, tiers.includes(tier), () => toggleTier(tier), `tier-${tier}`)
                  )}
                </ul>
              )}

              {FILTER_GROUPS.map((group) => {
                const available = group.filters.filter((filter) =>
                  inCollection.some((door) => filter.match(door))
                );

                if (available.length === 0) {
                  return null;
                }

                return renderGroup(
                  group.id,
                  group.label,
                  <ul className={styles.checks}>
                    {available.map((filter) =>
                      renderCheck(filter.id, filter.label, activeFilters.includes(filter.id), () =>
                        toggleFilter(filter.id)
                      )
                    )}
                  </ul>
                );
              })}

              {renderGroup(
                'series',
                'Серия',
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
              )}

              <button type="button" className={styles.reset} onClick={resetFilters}>
                Сбросить всё
              </button>
            </aside>

            <div>
              <div className={styles.resultsBar}>
                <p className={styles.count}>
                  Найдено {filtered.length} {plural(filtered.length, 'дверь', 'двери', 'дверей')}
                </p>
                <button
                  type="button"
                  className={styles.sortButton}
                  onClick={cycleSort}
                  aria-label={`Сортировка: ${SORT_LABELS[sort]}. Нажмите, чтобы изменить`}
                  title={SORT_LABELS[sort]}
                >
                  <SortIcon sort={sort} />
                </button>
              </div>
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
