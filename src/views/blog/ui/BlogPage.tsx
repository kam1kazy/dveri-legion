import { getArticlesByCategory, getCategories } from '@/entities/article';
import { ArticleCategoryPack } from '@/widgets/ArticleCategoryPack/ArticleCategoryPack';
import { BlogHero } from '@/widgets/BlogHero/BlogHero';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

export const BlogPage = () => {
  const categories = getCategories();

  return (
    <main>
      <BlogHero />

      {categories.map((category) => (
        <ArticleCategoryPack
          key={category.id}
          id={category.slug}
          title={category.title}
          articles={getArticlesByCategory(category.id)}
        />
      ))}

      <ContactArea />
    </main>
  );
};
