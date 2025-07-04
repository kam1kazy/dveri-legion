import { Image } from '@/shared/ui/Image/Image';

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
          <Image src="./images/icons/close.svg" alt="Закрыть мобильное меню" />
        </div>
      ) : (
        <div className={style.open_menu}>
          <Image src="./images/icons/menu.svg" alt="Мобильное меню" width={40} height={40} />
        </div>
      )}
    </>
  );
};
