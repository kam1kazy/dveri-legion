import { PageIntro } from '@/shared/ui/PageIntro';
import { TextSection } from '@/shared/ui/TextSection/TextSection';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import style from './AboutPage.module.scss';
import { aboutPage, aboutReasons, aboutStorySections } from './config/about';

export const AboutPage = () => {
  return (
    <>
      <section className={style.page}>
        <div className={`container ${style.introWrap}`}>
          <PageIntro title={aboutPage.title} description={aboutPage.description} />
        </div>

        <div className={style.sections}>
          {aboutStorySections.map((section) => (
            <TextSection key={section.id} {...section} />
          ))}
        </div>

        <div className="container">
          <div className={style.reasons}>
            <h2 className={style.reasonsTitle}>Почему выбирают нас</h2>
            <ul className={style.reasonsGrid}>
              {aboutReasons.map((reason) => (
                <li key={reason.id} className={style.reason}>
                  <h3 className={style.reasonTitle}>{reason.title}</h3>
                  <p className={style.reasonText}>{reason.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactArea />
    </>
  );
};
