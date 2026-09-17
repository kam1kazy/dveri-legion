import { TextSection } from '@/shared/ui/TextSection/TextSection';
import { PromotionsCarousel } from '@/widgets/PromotionsCarousel';
import { SaleSection } from '@/widgets/SaleSection';

import { aboutSectionsList } from './config/aboutSections';

export const AboutSection = () => {
  const [measurement, configurations, expertise] = aboutSectionsList;

  return (
    <>
      {measurement && <TextSection {...measurement} key={measurement.id} />}
      <SaleSection />
      {configurations && <TextSection {...configurations} key={configurations.id} />}
      <PromotionsCarousel />
      {expertise && <TextSection {...expertise} key={expertise.id} />}
    </>
  );
};
