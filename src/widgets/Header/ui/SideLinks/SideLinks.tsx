import { Button, IButton } from '@/shared/ui/Button';

import style from './SideLinks.module.scss';

const addLinks: IButton[] = [
  {
    id: 1,
    text: 'Вызвать замерщика',
    link: '/contacts',
  },
  {
    id: 2,
    text: 'Подобрать дверь',
    link: '/catalog',
    filled: true,
    icon: {
      src: '/images/icons/setting.svg',
      alt: 'Настройки',
    },
  },
];

interface ISideLinks {
  isLight?: boolean;
}

export const SideLinks = ({ isLight = false }: ISideLinks) => {
  return (
    <div className={style.header__add_links}>
      <ul>
        {addLinks.map((item) => (
          <li key={item.id}>
            <Button
              {...item}
              className={`${style.button} ${isLight && !item.filled ? style.lightButton : ''}`}
              text={item.text}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
