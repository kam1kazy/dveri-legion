import type { DropdownId } from '../../config/nav';
import { AboutDropdown, CollectionDropdown } from '../Dropdown';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { SideLinks } from '../SideLinks/SideLinks';
import styles from './Nav.module.scss';
import { NavLinks } from './NavLinks';

interface INav {
  isMobileOpen: boolean;
  isLight: boolean;
  openDropdown: DropdownId | null;
  onOpenDropdown: (id: DropdownId) => void;
  onToggleMobile: () => void;
}

export const Nav = ({
  isMobileOpen,
  isLight,
  openDropdown,
  onOpenDropdown,
  onToggleMobile,
}: INav) => {
  return (
    <div
      className={`${styles.header__nav} ${isMobileOpen ? styles.active : ''} ${isLight ? styles.light : ''}`}
    >
      <MobileMenu variant="close" onClick={onToggleMobile} />
      <NavLinks onOpen={onOpenDropdown} />
      <SideLinks isLight={isLight} />
      <CollectionDropdown isOpen={openDropdown === 'collection'} />
      <AboutDropdown isOpen={openDropdown === 'about'} />
    </div>
  );
};
