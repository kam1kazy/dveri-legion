import { Accordion } from '@/shared/ui/Accordion';
import { Link } from '@/shared/ui/Link';

import type { IFaqCategory, IFaqItem } from '../config/faq';
import styles from '../Faq.module.scss';

interface IFaqCategoryProps {
  category: IFaqCategory;
}

const FaqAnswer = ({ item }: { item: IFaqItem }) => {
  return (
    <>
      {item.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {item.list && item.list.length > 0 && (
        <ul>
          {item.list.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}

      {item.link && <Link text={item.link.text} href={item.link.href} />}

      {item.note && <p>{item.note}</p>}
    </>
  );
};

export const FaqCategory = ({ category }: IFaqCategoryProps) => {
  return (
    <section className={styles.category}>
      <h2 className={styles.categoryTitle}>{category.title}</h2>

      <div className={styles.items}>
        {category.items.map((item) => (
          <Accordion key={item.id} question={item.question}>
            <FaqAnswer item={item} />
          </Accordion>
        ))}
      </div>
    </section>
  );
};
