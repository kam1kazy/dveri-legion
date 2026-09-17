'use client';

import { useMemo } from 'react';

import { useScrollSpy } from '@/features/scroll-spy';
import { Link } from '@/shared/ui/Link';
import { CategoryPageShell } from '@/widgets/CategoryPageShell';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import style from './Buyers.module.scss';
import { buyersPage, buyersSections } from './config/buyers';

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
          <section key={section.id} id={section.id} className={style.section}>
            <h2 className={style.sectionTitle}>{section.label}</h2>
            {section.intro && <p className={style.intro}>{section.intro}</p>}

            <div className={style.blocks}>
              {section.blocks.map((block, index) => (
                <div key={`${section.id}-${index}`}>
                  {block.title && <h3 className={style.blockTitle}>{block.title}</h3>}

                  {block.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className={style.paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {block.list && block.list.length > 0 && (
                    <ul className={style.list}>
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {block.priceGroups && block.priceGroups.length > 0 && (
                    <div className={style.priceGroups}>
                      {block.priceGroups.map((group) => (
                        <div key={group.title} className={style.priceGroup}>
                          <h4 className={style.priceGroupTitle}>{group.title}</h4>
                          <ul className={style.priceList}>
                            {group.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          {group.note && <p className={style.note}>{group.note}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {block.link && (
                    <Link text={block.link.text} href={block.link.href} className={style.link} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </CategoryPageShell>

      <ContactArea />
    </>
  );
};
