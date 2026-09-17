import { getCollectionPreviews } from '@/entities/door';
import { plural } from '@/shared/lib/plural';
import { AboutSection } from '@/widgets/AboutSection/AboutSection';
import { CollectionCarousel } from '@/widgets/CollectionCarousel/CollectionCarousel';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';
import { PromoSection } from '@/widgets/PromoSection/PromoSection';
import { SloganSection } from '@/widgets/SloganSection/SloganSection';

export default function Home() {
  const collections = getCollectionPreviews().map((collection) => ({
    title: collection.title,
    subtitle: `${collection.count} ${plural(collection.count, 'модель', 'модели', 'моделей')}`,
    image: collection.doors[0]?.image ?? '/images/catalog/art-door.png',
    color: [],
    link: collection.href,
  }));

  return (
    <main>
      <SloganSection />
      <PromoSection />
      <CollectionCarousel slides={collections} />
      <AboutSection />
      <ContactArea />
    </main>
  );
}
