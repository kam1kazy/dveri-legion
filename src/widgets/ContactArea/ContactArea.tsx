import { type ITextCard, TextCard } from '@/shared/ui/TextCard/TextCard';

import { textCards } from './config/contactArea';
import style from './ContactArea.module.scss';

//TODO: Вынести цвет фона у блока куда нибудь

export const ContactArea = () => {
  return (
    <section className={style.contact_area}>
      <div className="container">
        <div className={style.wrapper}>
          <>
            {textCards.map((card: ITextCard) => (
              <TextCard {...card} key={card.id} />
            ))}
          </>
        </div>
      </div>
    </section>
  );
};
