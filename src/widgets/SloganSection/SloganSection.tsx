import { ArrowDownIcon } from '@/shared/ui/Icons';

import style from './SloganSection.module.scss';

export const SloganSection = () => {
  return (
    <section className={style.slogan}>
      <div className="container">
        <div className={style.wrapper}>
          <h3>
            Искусство создания теплых
            <br />
            моментов: совершенство Hugge
            <br />
            на вашем пороге
          </h3>

          <div className={style.arrow_down}>
            <a href="#promo">
              <ArrowDownIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
