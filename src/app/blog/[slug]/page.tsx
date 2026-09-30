import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllArticles, getArticleBySlug } from '@/entities/article';
import { ArticlePage } from '@/views/article';

interface ArticleRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Статья не найдена — Двери Legion' };
  }

  return {
    title: `${article.title} — Двери Legion`,
    description: article.excerpt,
  };
}

export default async function ArticleRoutePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}
