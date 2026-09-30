import {
  ArticleCard,
  ArticleListItem,
  getFeaturedArticle,
  getLatestArticles,
} from '@/entities/article';

import style from './BlogHero.module.scss';

interface BlogHeroProps {
  title?: string;
  subtitle?: string;
}

export const BlogHero = ({
  title = 'Блог',
  subtitle = 'Двери Legion — идеи, советы и проекты',
}: BlogHeroProps) => {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(6, featured?.slug);

  return (
    <section className={style.hero}>
      <div className="container">
        <header className={style.header}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.subtitle}>{subtitle}</p>
        </header>

        <div className={style.featuredRow}>
          {featured && (
            <div className={style.featured}>
              <ArticleCard article={featured} featured />
            </div>
          )}

          <ul className={style.list}>
            {latest.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
