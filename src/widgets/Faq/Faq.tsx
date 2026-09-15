import { faqCategories } from './config/faq';
import styles from './Faq.module.scss';
import { FaqCategory } from './ui/FaqCategory';

export const Faq = () => {
  return (
    <section className={styles.faq}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>FAQ</h1>
        </div>

        <div className={styles.list}>
          {faqCategories.map((category) => (
            <FaqCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
