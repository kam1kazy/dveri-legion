import { Button } from '@/shared/ui/Button';
import { ArrowRightWhiteIcon } from '@/shared/ui/Icons';
import { Link } from '@/shared/ui/Link';

import { formatArticleDate } from '../../model/selectors';
import type { Article } from '../../model/types';
import { ArticleBadge } from '../ArticleBadge/ArticleBadge';
import style from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  article: Article;
}

export const ArticleListItem = ({ article }: ArticleListItemProps) => {
  const href = `/blog/${article.slug}`;

  return (
    <li className={style.item}>
      <div className={style.meta}>
        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        {article.isNew && <ArticleBadge />}
      </div>

      <Link href={href} text={article.title} className={style.title} />

      <Button link={href} text="Читать статью" filled dark className={style.button}>
        <ArrowRightWhiteIcon />
      </Button>
    </li>
  );
};
