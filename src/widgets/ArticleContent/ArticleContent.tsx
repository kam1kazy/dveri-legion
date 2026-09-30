import { type Article, formatArticleDate, getCategoryById } from '@/entities/article';
import { Image } from '@/shared/ui/Image/Image';
import { Link } from '@/shared/ui/Link';

import style from './ArticleContent.module.scss';

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  const category = getCategoryById(article.categoryId);

  return (
    <article className={style.article}>
      <div className="container">
        <header className={style.header}>
          <div className={style.meta}>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            {category && (
              <>
                <span className={style.dot} aria-hidden />
                <Link
                  href={`/blog#${category.slug}`}
                  text={category.title}
                  className={style.category}
                />
              </>
            )}
          </div>

          <h1 className={style.title}>{article.title}</h1>
          <p className={style.excerpt}>{article.excerpt}</p>
        </header>

        <figure className={style.cover}>
          <Image
            src={article.cover}
            alt={article.title}
            width={1400}
            height={800}
            className={style.coverImage}
          />
        </figure>

        <div className={style.content}>
          {article.content.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2 key={`${block.type}-${index}`} className={style.heading}>
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'image') {
              return (
                <figure key={`${block.type}-${index}`} className={style.inlineFigure}>
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1000}
                    height={640}
                    className={style.inlineImage}
                  />
                </figure>
              );
            }

            return (
              <p key={`${block.type}-${index}`} className={style.paragraph}>
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
};
