'use client';

import { Logo } from '@/shared/ui/Logo/Logo';

import style from './Header.module.scss';
import { useHeaderMenu } from './model/useHeaderMenu';
import { MobileMenu } from './ui/MobileMenu/MobileMenu';
import { Nav } from './ui/Nav/Nav';

export const Header = () => {
  const {
    openDropdown,
    contentDropdown,
    isMobileOpen,
    isLight,
    open,
    close,
    keepOpen,
    toggleMobile,
  } = useHeaderMenu();

  return (
    <header
      className={`${style.header} ${isLight ? style.lightTheme : ''} ${isMobileOpen ? style.shadowboxActive : ''}`}
      onMouseEnter={keepOpen}
      onMouseLeave={close}
    >
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <MobileMenu variant="open" onClick={toggleMobile} />
          <Logo inverted={isLight} />
          <Nav
            isMobileOpen={isMobileOpen}
            isLight={isLight}
            openDropdown={openDropdown}
            contentDropdown={contentDropdown}
            onOpenDropdown={open}
            onToggleMobile={toggleMobile}
          />
        </div>
      </div>
    </header>
  );
};
