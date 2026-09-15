'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';

import { collectionNavItems } from '../../config/collections';
import { DropdownCarousel } from './Carousel/DropdownCarousel';
import styles from './Dropdown.module.scss';
import { DropdownMenu } from './DropdownMenu';

interface ICollectionDropdown {
  isActive: boolean;
}

export const CollectionDropdown = ({ isActive }: ICollectionDropdown) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setHoveredId(null);
    }
  }, [isActive]);

  return (
    <div className={styles.inner}>
      <div className={styles.sidebarLeft}>
        <DropdownMenu
          items={collectionNavItems}
          variant="collection"
          activeId={collectionNavItems[0]?.id}
          hoveredId={hoveredId}
          onItemEnter={setHoveredId}
        />
        <div className={styles.allCollections}>
          <Button border filled text="Посмотреть все коллекции">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className={styles.sidebarRight}>
        <DropdownCarousel items={collectionNavItems} hoveredId={hoveredId} isActive={isActive} />
      </div>
    </div>
  );
};
