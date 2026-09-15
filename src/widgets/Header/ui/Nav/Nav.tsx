import type { DropdownId } from '../../config/nav';
import { AboutDropdown, CollectionDropdown, Dropdown } from '../Dropdown';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { SideLinks } from '../SideLinks/SideLinks';
import styles from './Nav.module.scss';
import { NavLinks } from './NavLinks';

interface INav {
  isMobileOpen: boolean;
  isLight: boolean;
  openDropdown: DropdownId | null;
  contentDropdown: DropdownId | null;
  onOpenDropdown: (id: DropdownId) => void;
  onToggleMobile: () => void;
}

export const Nav = ({
  isMobileOpen,
  isLight,
  openDropdown,
  contentDropdown,
  onOpenDropdown,
  onToggleMobile,
}: INav) => {
  return (
    <div
      className={`${styles.header__nav} ${isMobileOpen ? styles.active : ''} ${isLight ? styles.light : ''}`}
    >
      <MobileMenu variant="close" onClick={onToggleMobile} />
      <NavLinks activeId={openDropdown} onOpen={onOpenDropdown} />
      <SideLinks isLight={isLight} />
      <Dropdown
        isOpen={openDropdown !== null}
        active={contentDropdown}
        collection={<CollectionDropdown isActive={contentDropdown === 'collection'} />}
        about={<AboutDropdown />}
      />
    </div>
  );
};
