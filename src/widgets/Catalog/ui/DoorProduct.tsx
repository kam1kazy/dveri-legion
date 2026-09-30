import NextLink from 'next/link';

import type { Door } from '@/entities/door';
import {
  COLLECTIONS,
  doorCollections,
  formatPrice,
  getDoorBenefitGroups,
  getDoorEditorialTitle,
  getDoorFitPoints,
  getDoorMarker,
  getDoorSpecTabs,
  getDoorUseCase,
} from '@/entities/door';
import { doorGallery } from '@/entities/door/server';
import { Button } from '@/shared/ui/Button';

import { BenefitIcon } from './BenefitIcon';
import styles from './DoorProduct.module.scss';
import { ProductGallery } from './ProductGallery';
import { SpecTabs } from './SpecTabs';

interface DoorProductProps {
  door: Door;
}

const PREVIEW_MARKERS = /(?=Размер по коробке:|Срок изготовления:|Монтаж:)/;

const parsePreviewLines = (text: string | null): { lines: string[]; prose: string | null } => {
  if (!text) {
    return { lines: [], prose: null };
  }

  if (!/Размер по коробке:|Срок изготовления:|Монтаж:/.test(text)) {
    return { lines: [], prose: text.replace(/&lt;br\s*\/?&gt;/gi, ' ').trim() };
  }

  const lines = text
    .split(PREVIEW_MARKERS)
    .map((line) => line.trim())
    .filter((line) => {
      const value = line.replace(/^[^:]+:\s*/, '').trim();
      return value.length > 0;
    });

  return { lines, prose: null };
};

const EXTRA_POINTS = [
  'Возможность изготовления под ваш размер',
  'Установка и монтаж под ключ',
  'Доставка по региону',
  'Консультация специалиста',
] as const;

export const DoorProduct = ({ door }: DoorProductProps) => {
  const title = getDoorEditorialTitle(door);
  const marker = getDoorMarker(door);
  const useCase = getDoorUseCase(door);
  const benefitGroups = getDoorBenefitGroups(door);
  const fitPoints = getDoorFitPoints(door);
  const specTabs = getDoorSpecTabs(door);
  const preview = parsePreviewLines(door.previewText);
  const collections = doorCollections(door);
  const primaryCollection = COLLECTIONS.find((item) => item.id === collections[0]);
  const catalogHref = primaryCollection
    ? `/catalog?collection=${primaryCollection.id}`
    : '/catalog';
  const backLabel = primaryCollection ? `← К каталогу: ${primaryCollection.label}` : '← К каталогу';

  return (
    <article className={styles.page}>
      <div className={`container ${styles.container}`}>
        <NextLink href={catalogHref} className={styles.back}>
          {backLabel}
        </NextLink>

        <div className={styles.layout}>
          <ProductGallery images={doorGallery(door)} alt={door.name} />

          <div className={styles.info}>
            <p className={styles.series}>{door.series}</p>
            <p className={styles.marker}>{marker}</p>
            <h1>{title}</h1>
            <p className={styles.useCase}>{useCase}</p>
            <p className={styles.price}>{formatPrice(door.price, door.currency)}</p>

            <div className={styles.cta}>
              <Button text="Получить расчёт этой двери" link="/contacts" filled dark />
              <p className={styles.priceNote}>
                Итоговая стоимость зависит от размера проёма, отделки и монтажа.
              </p>
            </div>

            {preview.lines.length > 0 && (
              <ul className={styles.previewList}>
                {preview.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}

            {preview.prose && <p className={styles.preview}>{preview.prose}</p>}
          </div>
        </div>

        <section className={styles.detailsLayout}>
          <div className={styles.detailsMain}>
            {benefitGroups.length > 0 && (
              <div className={styles.benefitsSection}>
                <div className={styles.sectionIntro}>
                  <p className={styles.sectionEyebrow}>За что вы платите</p>
                  <h2>Преимущества этой модели</h2>
                </div>

                <div className={styles.benefitGroups}>
                  {benefitGroups.map((group) => (
                    <div key={group.id} className={styles.benefitGroup}>
                      <ul className={styles.benefitRow}>
                        {group.items.map((benefit) => (
                          <li key={benefit.id}>
                            <span className={styles.benefitItemIcon}>
                              <BenefitIcon id={benefit.icon} />
                            </span>
                            <span className={styles.benefitLabel}>{benefit.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(door.features.length > 0 || fitPoints.length > 0) && (
              <div className={styles.supportGrid}>
                {door.features.length > 0 && (
                  <section className={styles.storySection}>
                    <div className={styles.sectionIntro}>
                      <p className={styles.sectionEyebrow}>Комплектация</p>
                      <h2>Что отмечено в каталоге</h2>
                    </div>
                    <ul className={styles.featureList}>
                      {door.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {fitPoints.length > 0 && (
                  <section className={styles.storySection}>
                    <div className={styles.sectionIntro}>
                      <p className={styles.sectionEyebrow}>Сценарий</p>
                      <h2>Подойдёт вам, если…</h2>
                    </div>
                    <ul className={styles.fitList}>
                      {fitPoints.map((point) => (
                        <li key={point.id}>{point.text}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {specTabs.length > 0 && (
              <section className={styles.specsLayout}>
                <div className={styles.sectionIntro}>
                  <p className={styles.sectionEyebrow}>Техническая спецификация</p>
                  <h2>Характеристики</h2>
                </div>
                <SpecTabs tabs={specTabs} />
              </section>
            )}

            <div className={styles.bottomNav}>
              <NextLink href={catalogHref} className={styles.backWide}>
                Вернуться в каталог
              </NextLink>
            </div>
          </div>

          <aside className={styles.detailsAside}>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>
                <BenefitIcon id="shield" />
              </span>
              <div>
                <h3>Гарантия качества</h3>
                <p>Все двери проходят контроль на производстве и соответствуют стандартам.</p>
              </div>
            </div>

            <div className={styles.extra}>
              <h3>Дополнительно</h3>
              <ul>
                {EXTRA_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <Button text="Получить расчёт этой двери" link="/contacts" filled dark />
          </aside>
        </section>
      </div>
    </article>
  );
};
