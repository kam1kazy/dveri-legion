import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image/Image';

import style from './PromoSection.module.scss';

export const PromoSection = () => {
  const promo = {
    title: 'ZMD-24',
    subtitle: 'Входная дверь из натурального дерева',
    src: '/images/promo.jpg',
    alt: 'Входная дверь',
  };

  return (
    <section className={style.promo}>
      <div className="container">
        <div className="wrapper">
          <div className={style.promo__inner}>
            <figure id="promo" className={style.promo__image}>
              <picture>
                <Image src={promo.src} alt={promo.alt} width={1720} height={1144} />
              </picture>
            </figure>

            <div className={style.promo__text}>
              <p className={style['promo__text--header']}>
                <span>{promo.subtitle}</span>
                {promo.title}
              </p>

              <Button
                text="Посмотреть коллекцию"
                className={style.button_position}
                filled
                icon={{ src: './images/icons/arrow-right.svg', alt: 'Настройки' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
