import { articleCategories, articles } from './mock';
import type { Article, ArticleCategory, ArticleCategoryId } from './types';

const byDateDesc = (a: Article, b: Article) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const getCategories = (): ArticleCategory[] => articleCategories;

export const getCategoryById = (id: ArticleCategoryId): ArticleCategory | undefined =>
  articleCategories.find((category) => category.id === id);

export const getAllArticles = (): Article[] => [...articles].sort(byDateDesc);

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);

export const getFeaturedArticle = (): Article | undefined =>
  articles.find((article) => article.isFeatured) ?? getAllArticles()[0];

export const getLatestArticles = (limit = 6, excludeSlug?: string): Article[] =>
  getAllArticles()
    .filter((article) => article.slug !== excludeSlug && !article.isFeatured)
    .slice(0, limit);

export const getArticlesByCategory = (categoryId: ArticleCategoryId): Article[] =>
  getAllArticles().filter((article) => article.categoryId === categoryId);

export const getRelatedArticles = (slug: string, limit = 3): Article[] => {
  const current = getArticleBySlug(slug);
  if (!current) {
    return [];
  }

  return getArticlesByCategory(current.categoryId)
    .filter((article) => article.slug !== slug)
    .slice(0, limit);
};

export const formatArticleDate = (date: string): string =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
