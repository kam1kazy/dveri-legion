'use client';

import { useMemo, useState } from 'react';

import { DocumentCard } from '@/entities/document';
import { useScrollSpy } from '@/features/scroll-spy';
import { CategorySection } from '@/shared/ui/CategorySection';
import { CategoryPageShell } from '@/widgets/CategoryPageShell';

import { documentCategories } from './config/documents';
import styles from './DocumentsListing.module.scss';

export const DocumentsListing = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sectionIds = useMemo(() => documentCategories.map((category) => category.id), []);

  const navItems = useMemo(
    () =>
      documentCategories.map((category) => ({
        id: category.id,
        label: category.label,
        href: `#${category.id}`,
      })),
    []
  );

  const activeId = useScrollSpy(sectionIds);

  const handleSelectCategory = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <CategoryPageShell
      title="Документы"
      description="Все каталоги, сертификаты и инструкции — скачивайте прямо с сайта."
      navItems={navItems}
      activeId={activeId}
      onSelectCategory={handleSelectCategory}
    >
      {documentCategories.map((category) => {
        const isExpanded = Boolean(expanded[category.id]);
        const visibleDocs = isExpanded
          ? category.documents
          : category.documents.slice(0, category.previewCount);
        const hasMore = category.documents.length > category.previewCount;

        return (
          <CategorySection
            key={category.id}
            id={category.id}
            title={category.label}
            footer={
              hasMore ? (
                <button
                  type="button"
                  className={styles.showMore}
                  onClick={() => toggleExpanded(category.id)}
                >
                  {isExpanded
                    ? 'Свернуть'
                    : `Показать ещё ${category.documents.length - category.previewCount}`}
                </button>
              ) : undefined
            }
          >
            {visibleDocs.map((doc) => (
              <DocumentCard key={doc.id} {...doc} />
            ))}
          </CategorySection>
        );
      })}
    </CategoryPageShell>
  );
};
