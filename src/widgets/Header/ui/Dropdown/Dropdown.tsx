import { ReactNode } from 'react';

import styles from './Dropdown.module.scss';

interface IDropdown {
  isOpen: boolean;
  variant: 'collection' | 'about';
  children: ReactNode;
}

export const Dropdown = ({ isOpen, variant, children }: IDropdown) => {
  return (
    <div className={`${styles.dropdown} ${styles[variant]} ${isOpen ? styles.open : ''}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
