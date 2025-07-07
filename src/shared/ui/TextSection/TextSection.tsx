import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image/Image';

import style from './TextSection.module.scss';

interface ITextSection {
  title: string;
  description: string;
  cover: string;
  button?: {
    text: string;
    href: string;
    src: string;
    alt?: string;
  };
  image?: 'left' | 'right';
  grayBg?: boolean;
  container?: boolean;
  inversion?: boolean;
}

export const TextSection = (props: ITextSection) => {
  const isImagePosition = props.image === 'left' && style['about_text__img-left'];
  const isGrayBg = props.grayBg && style['about_text-gray-bg'];

  return (
    <section className={`${style.about_text} ${isImagePosition} ${isGrayBg}`}>
      {props.container && `<div className="container">`}
      <div className={style.wrapper}>
        <div className={style.about_text__content}>
          <div className={style['about_text__content-wrapper']}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>

            <Button
              text={props.button?.text ?? ''}
              icon={{ src: props.button?.src ?? '', alt: props.button?.alt ?? '' }}
              filled
              dark
            />
          </div>
        </div>

        <Image className={style['about_text-img']} src={props.cover} alt={props.title} />
      </div>
      {props.container && `</div>`}
    </section>
  );
};
