import NextLink from 'next/link';

import { Image } from '@/shared/ui/Image/Image';

import styles from './Logo.module.scss';

export interface ILogo {
  inverted?: boolean;
}

export const Logo = ({ inverted = false }: ILogo) => {
  return (
    <NextLink href="/" className={`${styles.logo} ${inverted ? styles.inverted : ''}`}>
      <Image
        className={styles.logoLight}
        src="/images/logo_legion-light.svg"
        alt="Логотип"
        height={85}
        width={46}
      />
      <Image
        className={styles.logoDark}
        src="/images/logo_legion.svg"
        alt=""
        height={85}
        width={46}
      />
    </NextLink>
  );
};
