import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image/Image';
import { PageIntro } from '@/shared/ui/PageIntro';
import { TextSection } from '@/shared/ui/TextSection/TextSection';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import style from './AboutPage.module.scss';
import {
  aboutArt,
  aboutHarmony,
  aboutHero,
  aboutPage,
  aboutReasons,
  aboutStorySections,
} from './config/about';
import { DoorScene } from './ui/DoorScene';

export const AboutPage = () => {
  return (
    <>
      <section className={style.hero}>
        <div className={`container ${style.heroTitleWrap}`}>
          <p className={style.heroTitle}>{aboutHero.title}</p>
        </div>

        <DoorScene className={style.canvas} />

        <div className={`container ${style.heroLinksWrap}`}>
          <div className={style.heroLinks}>
            {aboutHero.links.map((link) => (
              <Button key={link.text} text={link.text} link={link.href} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${style.catalogBlock} ${style.art}`}>
        <div className="container">
          <div className={style.artWrapper}>
            <div className={style.artContent}>
              <p>
                {aboutArt.lead}
                <br />
                <br />
                <strong>{aboutArt.accent}</strong> {aboutArt.rest}
              </p>
            </div>

            <figure className={style.artFigure}>
              <Image src={aboutArt.cover} alt={aboutArt.alt} width={1600} height={900} />
            </figure>
          </div>
        </div>
      </section>

      <section className={`${style.catalogBlock} ${style.harmony}`}>
        <div className="container">
          <p className={style.harmonyLead}>
            <strong>{aboutHarmony.title}</strong>
            <br />
            {aboutHarmony.subtitle}
          </p>

          <div className={style.harmonyGrid}>
            {aboutHarmony.items.map((item) => (
              <div key={item.id} className={style.harmonyItem}>
                <figure className={style.harmonyFigure}>
                  <Image src={item.cover} alt={item.alt} width={320} height={320} />
                </figure>
                <p>
                  <strong>{item.title}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
