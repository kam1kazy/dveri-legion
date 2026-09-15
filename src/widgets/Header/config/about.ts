export interface IAboutLink {
  id: number;
  title: string;
  href: string;
  image?: string;
}

export const aboutMainLinks: IAboutLink[] = [
  {
    id: 1,
    title: 'Технологии',
    href: '#',
    image: '/images/img2.jpg',
  },
  {
    id: 2,
    title: 'Блог',
    href: '#',
    image: '/images/img3.jpg',
  },
  {
    id: 3,
    title: 'Как выбрать?',
    href: '#',
    image: '/images/img4.jpg',
  },
  {
    id: 4,
    title: 'Гарантия',
    href: '#',
    image: '/images/img5.jpg',
  },
];

export const aboutSmallLinks: IAboutLink[] = [
  {
    id: 5,
    title: 'FAQ',
    href: '#',
  },
  {
    id: 6,
    title: 'Контакты',
    href: '#',
  },
  {
    id: 7,
    title: 'Документы',
    href: '/documents',
  },
];
