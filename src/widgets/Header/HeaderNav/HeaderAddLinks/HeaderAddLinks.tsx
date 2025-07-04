import { Button, IButton } from '@/shared/ui/Button';

import style from './HeaderAddLinks.module.scss';

const addLinks: IButton[] = [
  {
    id: 1,
    text: 'Визуализация в 3D',
  },
  {
    id: 2,
    text: 'Собрать свою дверь',
    filled: true,
    icon: {
      src: './images/icons/setting.svg',
      alt: 'Настройки',
    },
  },
];

export const HeaderAddLinks = () => {
  return (
    <div className={style.header__add_links}>
      <ul>
        {addLinks.map((item) => (
          <li key={item.id}>
            <Button text={item.text} />
          </li>
        ))}
      </ul>
    </div>
  );
};
