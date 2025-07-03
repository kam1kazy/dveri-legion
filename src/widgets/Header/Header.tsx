'use client';

import { useState } from 'react';

import { ToggleMenu } from '@/features/ToggleMenu/ToggleMenu';
import { Logo } from '@/shared/ui/Logo/Logo';

import style from './Header.module.scss';
import { HeaderNav } from './HeaderNav/HeaderNav';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerToggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={style.header}>
      <div className="container">
        <div className="wrapper">
          <ToggleMenu onClick={handlerToggleMobileMenu} isOpen={isOpen} />
          <Logo />
          <HeaderNav onClick={handlerToggleMobileMenu} isOpen={isOpen} />
        </div>
      </div>
    </header>
  );
};
