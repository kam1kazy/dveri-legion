import { ILink, Link } from '@/shared/ui/Link';

const links: ILink[] = [
  {
    text: 'Коллекции',
    href: '#',
    className: 'nav__collection',
  },
  {
    text: 'Узнать больше',
    href: '#',
    className: 'nav__about',
  },
];

export const NavLinks = () => {
  return (
    <nav>
      {links.map((item, idx) => {
        return (
          <li key={idx} className={item.className}>
            <Link text={item.text} href={item.href} />
          </li>
        );
      })}
    </nav>
  );
};
