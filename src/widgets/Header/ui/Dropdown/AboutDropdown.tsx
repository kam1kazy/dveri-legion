'use client';

import { useState } from 'react';

import { Image } from '@/shared/ui/Image/Image';

import { aboutMainLinks, aboutSmallLinks } from '../../config/about';
import styles from './Dropdown.module.scss';
import { DropdownMenu } from './DropdownMenu';

interface IAboutDropdown {
  isActive: boolean;
}

export const AboutDropdown = ({ isActive: _isActive }: IAboutDropdown) => {
  const [selectedId, setSelectedId] = useState(aboutMainLinks[0]?.id);

  return (
    <div className={styles.inner}>
      <div className={styles.sidebarLeft}>
        <DropdownMenu
          items={aboutMainLinks}
          variant="about"
          activeId={aboutMainLinks[0]?.id}
          hoveredId={selectedId}
          onItemEnter={setSelectedId}
        />
        <DropdownMenu items={aboutSmallLinks} variant="small" />
      </div>

      <div className={styles.sidebarRight}>
        <div className={`${styles.imageArea} ${styles.toggleSelected}`}>
          {aboutMainLinks.map((item) => (
            <Image
              key={item.id}
              className={item.id === selectedId ? styles.selected : ''}
              src={item.image ?? ''}
              alt={item.title}
              width={416}
              height={416}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
