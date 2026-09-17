import NextLink from 'next/link';

import type { Door, DoorFlagId } from '@/entities/door';
import { CATEGORY_LABELS, FLAG_LABELS, formatPrice } from '@/entities/door';
import { doorGallery } from '@/entities/door/server';
import { Button } from '@/shared/ui/Button';

import styles from './DoorProduct.module.scss';
import { ProductGallery } from './ProductGallery';

interface DoorProductProps {
  door: Door;
}

const EXTRA_FLAGS: Array<Exclude<DoorFlagId, 'apartment' | 'house'>> = [
  'mirror',
  'thermalBreak',
  'electronicLock',
  'hiddenHinges',
];

export const DoorProduct = ({ door }: DoorProductProps) => {
  const title = door.name.replace(door.series, '').trim() || door.name;
  const categories: Array<'apartment' | 'house'> = [];

  if (door.categories.apartment) {
    categories.push('apartment');
  }

  if (door.categories.house) {
    categories.push('house');
  }
  const flags = EXTRA_FLAGS.filter((flag) => door.flags.includes(flag));

  return (
    <article className={styles.page}>
      <div className={`container ${styles.container}`}>
        <NextLink href="/catalog" className={styles.back}>
          ← К каталогу
        </NextLink>
        <div className={styles.layout}>
          <ProductGallery images={doorGallery(door)} alt={door.name} />
          <div className={styles.info}>
            <p className={styles.series}>{door.series}</p>
            <h1>{title}</h1>
            <div className={styles.tags}>
              {categories.map((id) => (
                <span key={id} className={styles.tag}>
                  {CATEGORY_LABELS[id]}
                </span>
              ))}
              {flags.map((flag) => (
                <span key={flag} className={styles.tagMuted}>
                  {FLAG_LABELS[flag]}
                </span>
              ))}
              {door.priceTier.map((tier) => (
                <span key={tier} className={styles.tagMuted}>
                  {tier}
                </span>
              ))}
            </div>
            <p className={styles.price}>{formatPrice(door.price, door.currency)}</p>
            {door.previewText && <p className={styles.preview}>{door.previewText}</p>}
            {door.features.length > 0 && (
              <ul className={styles.features}>
                {door.features.slice(0, 8).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            )}
            <Button text="Оставить заявку" link="/contacts" filled dark />
          </div>
        </div>

        {door.specs.length > 0 && (
          <section className={styles.specs}>
            <h2>Характеристики</h2>
            <div className={styles.specGrid}>
              {door.specs.map((spec) => (
                <div key={spec.key} className={styles.specBlock}>
                  <h3>{spec.name || spec.key}</h3>
                  {spec.pairs ? (
                    <dl>
                      {Object.entries(spec.pairs).map(([name, value]) => (
                        <div key={name}>
                          <dt>{name}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p>{spec.value}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
