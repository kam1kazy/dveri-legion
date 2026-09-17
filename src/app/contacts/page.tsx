import type { Metadata } from 'next';

import { ContactsPage } from '@/widgets/ContactsPage';

export const metadata: Metadata = {
  title: 'Контакты — Двери «Legion»',
  description:
    'Свяжитесь с Legion Doors: телефон, email, офис в Клину и выезд замерщика по России.',
};

export default function Contacts() {
  return (
    <main>
      <ContactsPage />
    </main>
  );
}
