import styles from './CategorySection.module.scss';

export interface ICategorySection {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const CategorySection = ({
  id,
  title,
  description,
  children,
  footer,
  className,
}: ICategorySection) => {
  return (
    <section id={id} className={`${styles.section} ${className ?? ''}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
};
