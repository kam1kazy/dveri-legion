import { ToggleMenu } from '@/features/ToggleMenu/ToggleMenu';

import { HeaderAddLinks } from './HeaderAddLinks/HeaderAddLinks';
import styles from './HeaderNav.module.scss';
import { NavLinks } from './NavLinks/NavLinks';

interface IHeaderNav {
  onClick: () => void;
  isOpen: boolean;
}
export const HeaderNav = (props: IHeaderNav) => {
  return (
    <div className={styles.header__nav}>
      <ToggleMenu isOpen={props.isOpen} onClick={props.onClick} />
      <NavLinks />
      <HeaderAddLinks />
    </div>
  );
};
