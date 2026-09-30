import styles from './PageIntro.module.scss';

export interface IPageIntro {
  title: string;
  description?: string;
  className?: string;
}

export const PageIntro = ({ title, description, className }: IPageIntro) => {
  return (
    <div className={`${styles.intro} ${className ?? ''}`} data-header-top-zone>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
