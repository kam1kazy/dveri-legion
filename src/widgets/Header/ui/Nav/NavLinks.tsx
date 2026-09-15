import { Link } from '@/shared/ui/Link';

import { type DropdownId, navLinks } from '../../config/nav';

interface INavLinks {
  onOpen: (id: DropdownId) => void;
}

export const NavLinks = ({ onOpen }: INavLinks) => {
  return (
    <nav>
      {navLinks.map((item) => (
        <li key={item.id} onMouseEnter={() => onOpen(item.id)} onClick={() => onOpen(item.id)}>
          <Link
            text={item.text}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
            }}
          />
        </li>
      ))}
    </nav>
  );
};
