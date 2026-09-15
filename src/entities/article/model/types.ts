export type ArticleCategoryId = 'collections' | 'tips' | 'projects';

export interface ArticleCategory {
  id: ArticleCategoryId;
  title: string;
  slug: string;
}

export type ArticleContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; alt: string };

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  categoryId: ArticleCategoryId;
  isNew?: boolean;
  isFeatured?: boolean;
  content: ArticleContentBlock[];
}
