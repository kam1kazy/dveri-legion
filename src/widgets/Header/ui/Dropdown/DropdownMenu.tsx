import { ArrowRightIcon } from '@/shared/ui/Icons';
import { Link } from '@/shared/ui/Link';

import styles from './Dropdown.module.scss';

export interface IDropdownMenuItem {
  id: number;
  title: string;
  href: string;
}

interface IDropdownMenu {
  items: IDropdownMenuItem[];
  variant?: 'collection' | 'about' | 'small';
  activeId?: number;
  onItemEnter?: (id: number) => void;
  onItemLeave?: () => void;
}

export const DropdownMenu = ({
  items,
  variant = 'about',
  activeId,
  onItemEnter,
  onItemLeave,
}: IDropdownMenu) => {
  const menuClass =
    variant === 'small'
      ? `${styles.menu} ${styles.menu_small}`
      : `${styles.menu} ${styles[`menu_${variant}`]}`;

  return (
    <ul className={menuClass}>
      {items.map((item) => (
        <li
          key={item.id}
          className={`${styles.link} ${item.id === activeId ? styles.active : ''}`}
          onMouseEnter={() => onItemEnter?.(item.id)}
          onMouseLeave={onItemLeave}
        >
          {variant === 'collection' && <span className={styles.marker} />}
          <ArrowRightIcon className={styles.linkIcon} />
          <Link text={item.title} href={item.href} />
        </li>
      ))}
    </ul>
  );
};
