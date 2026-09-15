'use client';

import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/ui/Logo/Logo';

import style from './Header.module.scss';
import { useHeaderMenu } from './model/useHeaderMenu';
import { MobileMenu } from './ui/MobileMenu/MobileMenu';
import { Nav } from './ui/Nav/Nav';

export type HeaderVariant = 'onDark' | 'onLight';

interface IHeader {
  variant?: HeaderVariant;
}

const LIGHT_PATHS = ['/faq', '/contacts', '/documents', '/blog'];

const isLightPath = (pathname: string) =>
  LIGHT_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export const Header = ({ variant }: IHeader) => {
  const pathname = usePathname();
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

  const isOnLight = variant === 'onLight' || (variant === undefined && isLightPath(pathname));
  const showLightChrome = isLight || isMobileOpen;
  const logoInverted = isOnLight || isLight;
  const navIsLight = isOnLight || isLight;

  return (
    <header
      className={`${style.header} ${isOnLight ? style.onLight : ''} ${showLightChrome ? style.lightTheme : ''} ${isMobileOpen ? style.shadowboxActive : ''}`}
      onMouseEnter={keepOpen}
      onMouseLeave={close}
    >
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <MobileMenu variant="open" onClick={toggleMobile} />
          <Logo inverted={logoInverted} />
          <Nav
            isMobileOpen={isMobileOpen}
            isLight={navIsLight}
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
