import { CloseIcon, MenuIcon } from '@/shared/ui/Icons';

import style from './MobileMenu.module.scss';

export interface IMobileMenu {
  onClick: () => void;
  variant: 'open' | 'close';
}

export const MobileMenu = ({ onClick, variant }: IMobileMenu) => {
  if (variant === 'close') {
    return (
      <button
        type="button"
        className={style.close_menu}
        onClick={onClick}
        aria-label="Закрыть меню"
      >
        <CloseIcon />
      </button>
    );
  }

  return (
    <button type="button" className={style.open_menu} onClick={onClick} aria-label="Открыть меню">
      <MenuIcon width={40} height={40} />
    </button>
  );
};
