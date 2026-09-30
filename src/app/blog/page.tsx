import type { Metadata } from 'next';

import { BlogPage } from '@/views/blog';

export const metadata: Metadata = {
  title: 'Блог — Двери Legion',
  description: 'Статьи о коллекциях, выборе и проектах с входными дверями Legion.',
};

export default function BlogRoutePage() {
  return <BlogPage />;
}
