import { Link } from '@/shared/ui/Link';

import type { IBuyersCard } from '../config/buyers';
import styles from './BuyersCard.module.scss';

export const BuyersCard = ({
  visual,
  visualCaption,
  title,
  description,
  list,
  prices,
  note,
  link,
  variant = 'default',
  wide,
}: IBuyersCard) => {
  return (
    <article
      className={`${styles.card} ${variant === 'dark' ? styles.dark : ''} ${wide ? styles.wide : ''}`}
    >
      {visual && (
        <div className={styles.visual}>
          <span className={styles.visualValue}>{visual}</span>
          {visualCaption && <span className={styles.visualCaption}>{visualCaption}</span>}
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {list && list.length > 0 && (
          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {prices && prices.length > 0 && (
          <ul className={styles.prices}>
            {prices.map((item) => (
              <li key={`${item.label}-${item.value}`}>
                <span>{item.label}</span>
                <span className={styles.priceValue}>{item.value}</span>
              </li>
            ))}
          </ul>
        )}

        {note && <p className={styles.note}>{note}</p>}

        {link && <Link text={link.text} href={link.href} className={styles.link} />}
      </div>
    </article>
  );
};
