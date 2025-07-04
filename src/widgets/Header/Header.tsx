'use client';

import { useState } from 'react';

import { Logo } from '@/shared/ui/Logo/Logo';
import { MobileMenu } from '@/widgets/Header/HeaderNav/ui/MobileMenu/MobileMenu';

import style from './Header.module.scss';
import { HeaderNav } from './HeaderNav/HeaderNav';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerToggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={style.header}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <MobileMenu onClick={handlerToggleMobileMenu} isOpen={isOpen} />
          <Logo />
          <HeaderNav onClick={handlerToggleMobileMenu} isOpen={isOpen} />
        </div>
      </div>
    </header>
  );
};
