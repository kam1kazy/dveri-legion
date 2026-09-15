import { Image } from '@/shared/ui/Image/Image';

import type { ICollectionNavItem } from '../../../config/collections';
import styles from './DropdownCarousel.module.scss';

interface IDropdownSlide {
  item: ICollectionNavItem;
}

export const DropdownSlide = ({ item }: IDropdownSlide) => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideInner}>
        <Image
          className={styles.slideImage}
          src={item.image}
          alt={item.title}
          width={357}
          height={175}
        />
        <p className={styles.slideTitle}>{item.title}</p>
      </div>
    </div>
  );
};
