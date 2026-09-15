import type { Metadata } from 'next';

import { Header } from '@/widgets/Header';
import { ContactsPage } from '@/widgets/ContactsPage';

export const metadata: Metadata = {
  title: 'Контакты — Двери «Legion»',
  description: 'Свяжитесь с нами: заявка, шоурум и офис Legion.',
};

export default function Contacts() {
  return (
    <>
      <Header />
      <main>
        <ContactsPage />
      </main>
    </>
  );
}
