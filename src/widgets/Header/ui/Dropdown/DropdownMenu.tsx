import { ArrowRightIcon } from '@/shared/ui/Icons';
import { Link } from '@/shared/ui/Link';

import styles from './Dropdown.module.scss';

export interface IDropdownMenuItem {
  id: string | number;
  title: string;
  href: string;
}

interface IDropdownMenu {
  items: IDropdownMenuItem[];
  variant?: 'collection' | 'about' | 'small';
  activeId?: string | number;
  hoveredId?: string | number | null;
  onItemEnter?: (id: string) => void;
}

export const DropdownMenu = ({
  items,
  variant = 'about',
  activeId,
  hoveredId,
  onItemEnter,
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
          className={`${styles.link} ${item.id === activeId ? styles.active : ''} ${item.id === hoveredId ? styles.hovered : ''}`}
          onMouseEnter={() => onItemEnter?.(String(item.id))}
        >
          {variant === 'collection' && <span className={styles.marker} />}
          <ArrowRightIcon className={styles.linkIcon} />
          <Link text={item.title} href={item.href} />
        </li>
      ))}
    </ul>
  );
};
