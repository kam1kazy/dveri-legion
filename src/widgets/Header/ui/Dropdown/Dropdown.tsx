import { ReactNode } from 'react';

import type { DropdownId } from '../../config/nav';
import styles from './Dropdown.module.scss';

interface IDropdown {
  isOpen: boolean;
  active: DropdownId | null;
  collection: ReactNode;
  about: ReactNode;
}

export const Dropdown = ({ isOpen, active, collection, about }: IDropdown) => {
  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
      <div
        className={`${styles.panel} ${styles.panelCollection} ${active === 'collection' ? styles.panelVisible : ''}`}
      >
        {collection}
      </div>
      <div
        className={`${styles.panel} ${styles.panelAbout} ${active === 'about' ? styles.panelVisible : ''}`}
      >
        {about}
      </div>
    </div>
  );
};
