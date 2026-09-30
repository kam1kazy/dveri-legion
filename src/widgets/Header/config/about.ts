export interface IAboutLink {
  id: number;
  title: string;
  href: string;
  image?: string;
}

export const aboutMainLinks: IAboutLink[] = [
  {
    id: 1,
    title: 'О компании',
    href: '/about',
    image: '/images/img4.jpg',
  },
  {
    id: 2,
    title: 'Фотогалерея',
    href: '/gallery',
    image: '/images/img5.jpg',
  },
  {
    id: 3,
    title: 'Покупателям',
    href: '/buyers',
    image: '/images/img-how.jpg',
  },
  {
    id: 4,
    title: 'Блог',
    href: '/blog',
    image: '/images/img-blog.jpg',
  },
];

export const aboutSmallLinks: IAboutLink[] = [
  {
    id: 5,
    title: 'FAQ',
    href: '/faq',
  },
  {
    id: 6,
    title: 'Контакты',
    href: '/contacts',
  },
  {
    id: 7,
    title: 'Документы',
    href: '/documents',
  },
];
