'use client';

import { useMemo } from 'react';

import { useScrollSpy } from '@/features/scroll-spy';
import { CategorySection } from '@/shared/ui/CategorySection';
import { CategoryPageShell } from '@/widgets/CategoryPageShell';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import { buyersPage, buyersSections } from './config/buyers';
import { BuyersCard } from './ui/BuyersCard';

export const Buyers = () => {
  const sectionIds = useMemo(() => buyersSections.map((section) => section.id), []);

  const navItems = useMemo(
    () =>
      buyersSections.map((section) => ({
        id: section.id,
        label: section.label,
        href: `#${section.id}`,
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

  return (
    <>
      <CategoryPageShell
        title={buyersPage.title}
        description={buyersPage.description}
        navItems={navItems}
        activeId={activeId}
        onSelectCategory={handleSelectCategory}
      >
        {buyersSections.map((section) => (
          <CategorySection
            key={section.id}
            id={section.id}
            title={section.label}
            description={section.intro}
          >
            {section.cards.map((card) => (
              <BuyersCard key={card.title} {...card} />
            ))}
          </CategorySection>
        ))}
      </CategoryPageShell>

      <ContactArea />
    </>
  );
};
