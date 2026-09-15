import { Link } from '@/shared/ui/Link';

import { type DropdownId, navLinks } from '../../config/nav';
import styles from './Nav.module.scss';

interface INavLinks {
  activeId: DropdownId | null;
  onOpen: (id: DropdownId) => void;
}

export const NavLinks = ({ activeId, onOpen }: INavLinks) => {
  return (
    <nav>
      <ul>
        {navLinks.map((item) => (
          <li
            key={item.id}
            className={item.id === activeId ? styles.isOpen : undefined}
            onMouseEnter={() => onOpen(item.id)}
            onClick={() => onOpen(item.id)}
          >
            <Link
              text={item.text}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
