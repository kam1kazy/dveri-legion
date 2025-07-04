import { MobileMenu } from '@/widgets/Header/ui/MobileMenu/MobileMenu';

import { SideLinks } from '../SideLinks/SideLinks';
import styles from './Nav.module.scss';
import { NavLinks } from './NavLinks';

interface INav {
  onClick: () => void;
  isOpen: boolean;
}
export const Nav = (props: INav) => {
  return (
    <div className={styles.header__nav}>
      <MobileMenu isOpen={props.isOpen} onClick={props.onClick} />
      <NavLinks />
      <SideLinks />
    </div>
  );
};
