export type DropdownId = 'collection' | 'about';

export interface INavLink {
  id: DropdownId;
  text: string;
  href: string;
}

export const navLinks: INavLink[] = [
  {
    id: 'collection',
    text: 'Коллекции',
    href: '/catalog',
  },
  {
    id: 'about',
    text: 'Узнать больше',
    href: '/about',
  },
];
