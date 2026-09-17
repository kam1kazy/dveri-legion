'use client';

import { Link } from '@/shared/ui/Link';

import styles from './CategoryNav.module.scss';

export interface ICategoryNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface ICategoryNav {
  items: ICategoryNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  layout?: 'row' | 'stack';
  className?: string;
}

export const CategoryNav = ({
  items,
  activeId,
  onSelect,
  layout = 'row',
  className,
}: ICategoryNav) => {
  const handleClick = (item: ICategoryNavItem) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = item.href ?? `#${item.id}`;

    if (onSelect && href.startsWith('#')) {
      event.preventDefault();
      const target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      onSelect(item.id);
    }
  };

  return (
    <nav
      className={`${styles.nav} ${layout === 'stack' ? styles.stack : styles.row} ${className ?? ''}`}
      aria-label="Категории"
    >
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const href = item.href ?? `#${item.id}`;

          return (
            <li key={item.id} className={styles.item}>
              <Link
                text={item.label}
                href={href}
                className={`${styles.pill} ${isActive ? styles.active : ''}`}
                onClick={handleClick(item)}
                aria-current={isActive ? 'true' : undefined}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
