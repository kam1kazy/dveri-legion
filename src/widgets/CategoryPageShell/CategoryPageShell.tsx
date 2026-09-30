import { CategoryNav, type ICategoryNavItem } from '@/shared/ui/CategoryNav';
import { PageIntro } from '@/shared/ui/PageIntro';

import styles from './CategoryPageShell.module.scss';

export interface ICategoryPageShell {
  title: string;
  description?: string;
  navItems: ICategoryNavItem[];
  activeId?: string;
  onSelectCategory?: (id: string) => void;
  children: React.ReactNode;
}

export const CategoryPageShell = ({
  title,
  description,
  navItems,
  activeId,
  onSelectCategory,
  children,
}: ICategoryPageShell) => {
  return (
    <div className={styles.shell}>
      <div className="container">
        <PageIntro title={title} description={description} />
        <CategoryNav
          items={navItems}
          activeId={activeId}
          onSelect={onSelectCategory}
          layout="stack"
        />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
