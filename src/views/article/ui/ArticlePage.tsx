import { type Article, getCategoryById, getRelatedArticles } from '@/entities/article';
import { ArticleCategoryPack } from '@/widgets/ArticleCategoryPack/ArticleCategoryPack';
import { ArticleContent } from '@/widgets/ArticleContent/ArticleContent';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

interface ArticlePageProps {
  article: Article;
}

export const ArticlePage = ({ article }: ArticlePageProps) => {
  const related = getRelatedArticles(article.slug, 3);
  const category = getCategoryById(article.categoryId);

  return (
    <main>
      <ArticleContent article={article} />

      {related.length > 0 && (
        <ArticleCategoryPack
          title={category ? `Читать также · ${category.title}` : 'Читать также'}
          articles={related}
        />
      )}

      <ContactArea />
    </main>
  );
};
