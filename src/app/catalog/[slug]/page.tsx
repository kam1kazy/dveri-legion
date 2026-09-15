import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { doors, getDoorBySlug } from '@/entities/door/model/catalog';
import { DoorProduct } from '@/widgets/Catalog/ui/DoorProduct';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => {
  return doors.map((door) => ({ slug: door.slug }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const door = getDoorBySlug(slug);

  if (!door) {
    return { title: 'Дверь не найдена' };
  }

  return {
    title: `${door.name} — Legion`,
    description: door.previewText || door.name,
  };
};

export default async function DoorPage({ params }: PageProps) {
  const { slug } = await params;
  const door = getDoorBySlug(slug);

  if (!door) {
    notFound();
  }

  return <DoorProduct door={door} />;
}
