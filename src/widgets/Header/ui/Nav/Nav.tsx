import { MobileMenu } from '@/widgets/Header/ui/MobileMenu/MobileMenu';

import { NavLinks } from '../NavLinks';
import { SideLinks } from '../SideLinks/SideLinks';
import styles from './Nav.module.scss';

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
