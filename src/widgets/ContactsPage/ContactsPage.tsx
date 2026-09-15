import { ContactForm } from '@/features/ContactForm';
import { ContactArea } from '@/widgets/ContactArea/ContactArea';

import { contactsPage, locations } from './config/contacts';
import style from './ContactsPage.module.scss';
import { LocationCard } from './ui/LocationCard';

export const ContactsPage = () => {
  return (
    <>
      <section className={style.page}>
        <div className="container">
          <header className={style.intro}>
            <h1 className={style.title}>{contactsPage.title}</h1>
            <p className={style.subtitle}>{contactsPage.subtitle}</p>
          </header>

          <div className={style.formSection}>
            <ContactForm />
          </div>

          <div className={style.locations}>
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <ContactArea />
    </>
  );
};
