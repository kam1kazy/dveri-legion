import type { Metadata } from 'next';

import { ContactArea } from '@/widgets/ContactArea/ContactArea';
import { Faq } from '@/widgets/Faq';

export const metadata: Metadata = {
  title: 'FAQ — Двери «Legion»',
  description: 'Ответы на частые вопросы о дверях Legion: уход, покупка, установка и коллекции.',
};

export default function FaqPage() {
  return (
    <main>
      <Faq />
      <ContactArea />
    </main>
  );
}
