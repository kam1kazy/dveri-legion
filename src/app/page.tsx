import { AboutSection } from '@/widgets/AboutSection/AboutSection';
import { CollectionCarousel } from '@/widgets/CollectionCarousel/CollectionCarousel';
import { Header } from '@/widgets/Header';
import { PromoSection } from '@/widgets/PromoSection/PromoSection';
import { SloganSection } from '@/widgets/SloganSection/SloganSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SloganSection />
        <PromoSection />
        <CollectionCarousel />
        <AboutSection />
      </main>
    </>
  );
}
