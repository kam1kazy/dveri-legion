import { type ITextSection, TextSection } from '@/shared/ui/TextSection/TextSection';

import { aboutSectionsList } from './config/aboutSections';

export const AboutSection = () => {
  return (
    <>
      {aboutSectionsList.map((section: ITextSection) => (
        <TextSection {...section} key={section.id} />
      ))}
    </>
  );
};
