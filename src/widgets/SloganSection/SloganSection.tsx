import { ArrowDownIcon } from '@/shared/ui/Icons';

import style from './SloganSection.module.scss';

export const SloganSection = () => {
  return (
    <section className={style.slogan} data-header-top-zone>
      <div className="container">
        <div className={style.wrapper}>
          <h3>
            ЛЕГИОН — современные
            <br />
            входные двери: надёжность,
            <br />
            стиль и тепло в каждом доме
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
