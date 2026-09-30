import NextImage from 'next/image';
import NextLink from 'next/link';

import { doorImage, formatPrice } from '../model/catalog';
import { getDoorBenefits, getDoorEditorialTitle, getDoorMarker } from '../model/presentation';
import type { DoorListItem } from '../model/types';
import styles from './DoorCard.module.scss';

interface DoorCardProps {
  door: DoorListItem;
}

export const DoorCard = ({ door }: DoorCardProps) => {
  const outer = doorImage(door, 'outer');
  const inner = doorImage(door, 'inner');
  const hasInner = inner !== outer;
  const title = getDoorEditorialTitle(door);
  const marker = getDoorMarker(door);
  const benefits = getDoorBenefits(door, 3);

  return (
    <NextLink href={`/catalog/${door.slug}`} className={styles.card}>
      <div className={styles.media}>
        <NextImage src={outer} alt={door.name} width={480} height={960} className={styles.photo} />
        {hasInner && (
          <NextImage
            src={inner}
            alt=""
            width={480}
            height={960}
            className={`${styles.photo} ${styles.inner}`}
          />
        )}
        <span className={styles.marker}>{marker}</span>
        {hasInner && <span className={styles.hint}>снаружи / внутри</span>}
        <span className={styles.details}>Смотреть детали</span>
      </div>

      <div className={styles.body}>
        <p className={styles.series}>{door.series}</p>
        <h3 className={styles.title}>{title}</h3>

        {benefits.length > 0 && (
          <ul className={styles.benefits}>
            {benefits.map((benefit) => (
              <li key={benefit.id}>
                <span className={styles.benefitLabel}>{benefit.label}</span>
                <span className={styles.benefitDetail}>{benefit.detail}</span>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.price}>{formatPrice(door.price, door.currency)}</p>
      </div>
    </NextLink>
  );
};
