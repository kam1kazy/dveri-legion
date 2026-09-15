import type { Metadata } from 'next';

import { ContactsPage } from '@/widgets/ContactsPage';

export const metadata: Metadata = {
  title: 'Контакты — Двери «Legion»',
  description: 'Свяжитесь с нами: заявка, шоурум и офис Legion.',
};

export default function Contacts() {
  return (
    <main>
      <ContactsPage />
    </main>
  );
}
