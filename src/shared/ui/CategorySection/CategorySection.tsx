import styles from './CategorySection.module.scss';

export interface ICategorySection {
  id: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const CategorySection = ({ id, title, children, footer, className }: ICategorySection) => {
  return (
    <section id={id} className={`${styles.section} ${className ?? ''}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
};
