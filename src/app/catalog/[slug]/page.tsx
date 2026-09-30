import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { doors } from '@/entities/door';
import { getDoorBySlug } from '@/entities/door/server';
import { DoorProduct } from '@/widgets/Catalog/ui/DoorProduct';

interface DoorRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return doors.map((door) => ({ slug: door.slug }));
}

export async function generateMetadata({ params }: DoorRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const door = getDoorBySlug(slug);

  if (!door) {
    return { title: 'Дверь не найдена — Двери «Legion»' };
  }

  return {
    title: `${door.name} — Двери «Legion»`,
    description: door.previewText || door.name,
  };
}

export default async function DoorRoutePage({ params }: DoorRouteProps) {
  const { slug } = await params;
  const door = getDoorBySlug(slug);

  if (!door) {
    notFound();
  }

  return (
    <main>
      <DoorProduct door={door} />
    </main>
  );
}
