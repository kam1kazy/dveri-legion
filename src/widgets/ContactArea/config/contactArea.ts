import type { ITextCard } from '@/shared/ui/TextCard/TextCard';

export const textCards: ITextCard[] = [
  {
    id: 1,
    title: 'Для профессионалов',
    description: 'Профессионалы, мы здесь, чтобы поддержать вас в вашем проекте.',
    button: {
      text: 'Свяжитесь с нами',
      href: '#',
    },
    dark: false,
  },
  {
    id: 2,
    title: 'Связаться с нами',
    description: 'Вопрос? Проект? Мы в вашем распоряжении, чтобы ответить на них.',
    button: {
      text: 'Оставить заявку',
      href: '#',
    },
    dark: true,
  },
];
