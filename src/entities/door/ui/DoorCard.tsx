import NextImage from 'next/image';
import NextLink from 'next/link';

import {
  CATEGORY_LABELS,
  doorImage,
  FLAG_LABELS,
  formatPrice,
} from '@/entities/door/model/catalog';
import type { Door, DoorFlagId } from '@/entities/door/model/types';

import styles from './DoorCard.module.scss';

interface DoorCardProps {
  door: Door;
}

const CARD_FLAGS: Array<Exclude<DoorFlagId, 'apartment' | 'house'>> = [
  'mirror',
  'thermalBreak',
  'electronicLock',
  'hiddenHinges',
];

export const DoorCard = ({ door }: DoorCardProps) => {
  const outer = doorImage(door, 'outer');
  const inner = doorImage(door, 'inner');
  const hasInner = inner !== outer;
  const categories: Array<'apartment' | 'house'> = [];

  if (door.categories.apartment) {
    categories.push('apartment');
  }

  if (door.categories.house) {
    categories.push('house');
  }
  const flags = CARD_FLAGS.filter((flag) => door.flags.includes(flag));

  return (
    <NextLink href={`/catalog/${door.slug}`} className={styles.card}>
      <div className={styles.media}>
        <NextImage src={outer} alt={door.name} width={400} height={800} className={styles.photo} />
        {hasInner && (
          <NextImage
            src={inner}
            alt=""
            width={400}
            height={800}
            className={`${styles.photo} ${styles.inner}`}
          />
        )}
        {hasInner && <span className={styles.hint}>снаружи / внутри</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.series}>{door.series}</p>
        <h3 className={styles.title}>{door.name.replace(door.series, '').trim()}</h3>
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
        </div>
        <p className={styles.price}>{formatPrice(door.price, door.currency)}</p>
      </div>
    </NextLink>
  );
};
