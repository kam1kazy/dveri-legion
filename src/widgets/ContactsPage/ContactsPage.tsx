import { ContactForm } from '@/features/ContactForm';
import { PageIntro } from '@/shared/ui/PageIntro';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import { companyRequisites, contactsPage, locations } from './config/contacts';
import style from './ContactsPage.module.scss';
import { LocationCard } from './ui/LocationCard';

export const ContactsPage = () => {
  return (
    <>
      <section className={style.page}>
        <div className={`container ${style.introWrap}`}>
          <PageIntro title={contactsPage.title} description={contactsPage.subtitle} />
        </div>

        <div className="container">
          <div className={style.formSection}>
            <ContactForm />
          </div>
        </div>

        <div className={style.locations}>
          {locations.map((location) => (
            <div key={location.id} className="container">
              <LocationCard location={location} />
            </div>
          ))}
        </div>

        <div className="container">
          <aside className={style.requisites}>
            <h2 className={style.requisitesTitle}>{companyRequisites.title}</h2>
            <dl className={style.requisitesList}>
              {companyRequisites.items.map((item) => (
                <div key={item.label} className={style.requisitesItem}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <ContactArea />
    </>
  );
};
