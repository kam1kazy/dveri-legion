'use client';

import { useState } from 'react';

import { Image } from '@/shared/ui/Image/Image';

import { aboutMainLinks, aboutSmallLinks } from '../../config/about';
import { Dropdown } from './Dropdown';
import styles from './Dropdown.module.scss';
import { DropdownMenu } from './DropdownMenu';

interface IAboutDropdown {
  isOpen: boolean;
}

export const AboutDropdown = ({ isOpen }: IAboutDropdown) => {
  const [selectedId, setSelectedId] = useState(aboutMainLinks[0]?.id);

  return (
    <Dropdown isOpen={isOpen} variant="about">
      <div className={styles.sidebarLeft}>
        <DropdownMenu
          items={aboutMainLinks}
          variant="about"
          activeId={aboutMainLinks[0]?.id}
          onItemEnter={setSelectedId}
          onItemLeave={() => setSelectedId(aboutMainLinks[0]?.id)}
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
    </Dropdown>
  );
};
