import { Image } from '@/shared/ui/Image/Image';

import styles from './Logo.module.scss';

export interface ILogo {
  mode?: 'light' | 'dark';
}

export const Logo = ({ mode }: ILogo) => {
  return (
    <div className={styles.logo}>
      {}
      <Image
        className={mode === 'dark' ? 'logo-dark' : 'logo-light'}
        src={mode === 'dark' ? './images/logo_legion.svg' : './images/logo_legion-light.svg'}
        alt="Логотип"
        height={85}
        width={46}
      />
    </div>
  );
};
