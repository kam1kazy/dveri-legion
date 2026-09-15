'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';

import { collectionNavItems } from '../../config/collections';
import { DropdownCarousel } from './Carousel/DropdownCarousel';
import { Dropdown } from './Dropdown';
import styles from './Dropdown.module.scss';
import { DropdownMenu } from './DropdownMenu';

interface ICollectionDropdown {
  isOpen: boolean;
}

export const CollectionDropdown = ({ isOpen }: ICollectionDropdown) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Dropdown isOpen={isOpen} variant="collection">
      <div className={styles.sidebarLeft}>
        <DropdownMenu
          items={collectionNavItems}
          variant="collection"
          activeId={collectionNavItems[0]?.id}
          onItemEnter={setHoveredId}
          onItemLeave={() => setHoveredId(null)}
        />
        <div className={styles.allCollections}>
          <Button border filled text="Посмотреть все коллекции">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className={styles.sidebarRight}>
        <DropdownCarousel items={collectionNavItems} hoveredId={hoveredId} isActive={isOpen} />
      </div>
    </Dropdown>
  );
};
