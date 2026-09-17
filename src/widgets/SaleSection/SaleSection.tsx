import NextImage from 'next/image';
import NextLink from 'next/link';

import { doorImage, doors, formatPrice } from '@/entities/door';

import { saleItems, saleSection } from './config/sale';
import styles from './SaleSection.module.scss';

const oldPrice = (price: number, discount: number) => Math.round(price / (1 - discount / 100));

export const SaleSection = () => {
  const items = saleItems
    .map((item) => {
      const door = doors.find((entry) => entry.id === item.doorId);

      if (!door || door.price === null) {
        return null;
      }

      return {
        ...item,
        door,
        old: oldPrice(door.price, item.discount),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.sale}>
      <div className="container">
        <div className={styles.head}>
          <h2 className={styles.title}>{saleSection.title}</h2>
          <p className={styles.subtitle}>{saleSection.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {items.map(({ door, discount, badge, old }) => (
            <NextLink key={door.id} href={`/catalog/${door.slug}`} className={styles.card}>
              <div className={styles.media}>
                <NextImage
                  src={doorImage(door)}
                  alt={door.name}
                  width={400}
                  height={800}
                  className={styles.photo}
                />
                <div className={styles.badges}>
                  <span className={styles.discount}>−{discount}%</span>
                  <span className={styles.badge}>{badge}</span>
                </div>
              </div>
              <div className={styles.body}>
                <p className={styles.name} title={door.name}>
                  {door.name}
                </p>
                <div className={styles.prices}>
                  <span className={styles.price}>от {formatPrice(door.price, door.currency)}</span>
                  <span className={styles.old}>{formatPrice(old, door.currency)}</span>
                </div>
                <span className={styles.hint}>Подробнее →</span>
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
};
