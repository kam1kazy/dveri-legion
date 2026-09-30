import { Image } from '@/shared/ui/Image/Image';
import { Link } from '@/shared/ui/Link';

import type { IDocument } from '../model/types';
import styles from './DocumentCard.module.scss';

export interface IDocumentCard extends IDocument {
  className?: string;
}

export const DocumentCard = ({ title, href, fileType, cover, className }: IDocumentCard) => {
  return (
    <Link text="" href={href} className={`${styles.card} ${className ?? ''}`} aria-label={title}>
      <div className={styles.cover}>
        <Image src={cover} alt="" width={480} height={320} className={styles.image} />
      </div>
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.fileType}>{fileType}</span>
      </div>
    </Link>
  );
};
