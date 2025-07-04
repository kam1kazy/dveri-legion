import { Header } from '@/widgets/Header';
import { PromoSection } from '@/widgets/PromoSection/PromoSection';
import { SloganSection } from '@/widgets/SloganSection/SloganSection';

export default function Home() {
  return (
    <>
      <Header />
      <SloganSection />
      <PromoSection />
    </>
  );
}
