import { MobileMenu } from '@/widgets/Header/HeaderNav/ui/MobileMenu/MobileMenu';

import styles from './HeaderNav.module.scss';
import { NavLinks } from './ui/NavLinks';
import { SideLinks } from './ui/SideLinks/SideLinks';

interface IHeaderNav {
  onClick: () => void;
  isOpen: boolean;
}
export const HeaderNav = (props: IHeaderNav) => {
  return (
    <div className={styles.header__nav}>
      <MobileMenu isOpen={props.isOpen} onClick={props.onClick} />
      <NavLinks />
      <SideLinks />
    </div>
  );
};
