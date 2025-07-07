import { CloseIcon, MenuIcon } from '@/shared/ui/Icons';

import style from './MobileMenu.module.scss';

export interface IMobileMenu {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenu = (props: IMobileMenu) => {
  return (
    <>
      {props.isOpen ? (
        <div className={style.close_menu} onClick={props.onClick}>
          <CloseIcon />
        </div>
      ) : (
        <div className={style.open_menu}>
          <MenuIcon width={40} height={40} />
        </div>
      )}
    </>
  );
};
