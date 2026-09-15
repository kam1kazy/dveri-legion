'use client';

import { useState } from 'react';

import { Logo } from '@/shared/ui/Logo/Logo';
import { MobileMenu } from '@/widgets/Header/ui/MobileMenu/MobileMenu';

import style from './Header.module.scss';
import { Nav } from './ui/Nav/Nav';

interface HeaderProps {
  solid?: boolean;
}

export const Header = ({ solid = false }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerToggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={`${style.header} ${solid ? style.solid : ''}`}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <MobileMenu onClick={handlerToggleMobileMenu} isOpen={isOpen} />
          <Logo mode={solid ? 'dark' : undefined} />
          <Nav onClick={handlerToggleMobileMenu} isOpen={isOpen} />
        </div>
      </div>
    </header>
  );
};
