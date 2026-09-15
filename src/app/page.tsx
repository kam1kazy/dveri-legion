import { AboutSection } from '@/widgets/AboutSection/AboutSection';
import { CollectionCarousel } from '@/widgets/CollectionCarousel/CollectionCarousel';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';
import { PromoSection } from '@/widgets/PromoSection/PromoSection';
import { SloganSection } from '@/widgets/SloganSection/SloganSection';

export default function Home() {
  return (
    <main>
      <SloganSection />
      <PromoSection />
      <CollectionCarousel />
      <AboutSection />
      <ContactArea />
    </main>
  );
}
