import type { ITextCard } from '@/shared/ui/TextCard/TextCard';

export const textCards: ITextCard[] = [
  {
    id: 1,
    title: 'Для профессионалов',
    description:
      'Дизайнерам, строителям и управляющим компаниям — помогаем с подбором, сроками и комплектацией под объект.',
    button: {
      text: 'Свяжитесь с нами',
      href: '/contacts',
    },
    dark: false,
  },
  {
    id: 2,
    title: 'Связаться с нами',
    description:
      'Вопрос или проект? Получите бесплатную консультацию и подбор оптимальной двери прямо сейчас.',
    button: {
      text: 'Оставить заявку',
      href: '/contacts',
    },
    dark: true,
  },
];
