import { type Article, ArticleCard } from '@/entities/article';

import style from './ArticleCategoryPack.module.scss';

interface ArticleCategoryPackProps {
  id?: string;
  title: string;
  articles: Article[];
}

export const ArticleCategoryPack = ({ id, title, articles }: ArticleCategoryPackProps) => {
  if (!articles.length) {
    return null;
  }

  return (
    <section id={id} className={style.pack}>
      <div className="container">
        <h2 className={style.title}>{title}</h2>

        <div className={style.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
