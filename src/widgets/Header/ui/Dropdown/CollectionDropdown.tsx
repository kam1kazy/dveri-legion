'use client';

import { useEffect, useState } from 'react';

import type { DoorCollectionPreview } from '@/entities/door';
import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';

import { DropdownCarousel } from './Carousel/DropdownCarousel';
import styles from './Dropdown.module.scss';
import { DropdownMenu } from './DropdownMenu';

interface ICollectionDropdown {
  isActive: boolean;
  collections: DoorCollectionPreview[];
}

export const CollectionDropdown = ({ isActive, collections }: ICollectionDropdown) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) {
      setHoveredId(null);
    }
  }, [isActive]);

  const active = collections.find((item) => item.id === hoveredId) ?? collections[0];

  const slides = (active?.doors ?? []).map((door) => ({
    id: door.id,
    title: door.title,
    href: door.href,
    image: door.image,
  }));

  return (
    <div className={styles.inner}>
      <div className={styles.sidebarLeft}>
        <DropdownMenu
          items={collections.map((item) => ({
            id: item.id,
            title: item.title,
            href: item.href,
          }))}
          variant="collection"
          activeId={active?.id}
          hoveredId={hoveredId}
          onItemEnter={setHoveredId}
        />
        <div className={styles.allCollections}>
          <Button border filled text="Посмотреть весь каталог" link="/catalog">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className={styles.sidebarRight}>
        <DropdownCarousel items={slides} hoveredId={null} isActive={isActive} />
      </div>
    </div>
  );
};
