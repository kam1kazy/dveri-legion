import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon, ArrowRightWhiteIcon } from '@/shared/ui/Icons';
import { Image } from '@/shared/ui/Image/Image';
import { Link } from '@/shared/ui/Link';

import { formatArticleDate } from '../../model/selectors';
import type { Article } from '../../model/types';
import { ArticleBadge } from '../ArticleBadge/ArticleBadge';
import style from './ArticleCard.module.scss';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const href = `/blog/${article.slug}`;

  if (featured) {
    return (
      <article className={`${style.card} ${style.featured}`}>
        <Link href={href} text="" className={style.mediaLink}>
          <Image
            src={article.cover}
            alt={article.title}
            width={880}
            height={1100}
            className={style.cover}
          />
        </Link>

        <div className={style.overlay}>
          <div className={style.overlayMeta}>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            {article.isNew && <ArticleBadge className={style.badgeOnDark} />}
          </div>

          <Link href={href} text={article.title} className={style.overlayTitle} />

          <Button link={href} text="Читать статью" filled className={style.overlayButton}>
            <ArrowRightIcon />
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article className={style.card}>
      <Link href={href} text="" className={style.mediaLink}>
        <Image
          src={article.cover}
          alt={article.title}
          width={640}
          height={480}
          className={style.cover}
        />
      </Link>

      <div className={style.body}>
        <div className={style.meta}>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          {article.isNew && <ArticleBadge />}
        </div>

        <Link href={href} text={article.title} className={style.title} />

        <Button link={href} text="Читать статью" filled dark>
          <ArrowRightWhiteIcon />
        </Button>
      </div>
    </article>
  );
};
