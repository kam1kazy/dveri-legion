import { Button } from '@/shared/ui/Button';
import { Image } from '@/shared/ui/Image/Image';

import { ArrowRightWhiteIcon } from '../Icons';
import style from './TextSection.module.scss';

export interface ITextSection {
  id?: number;
  title: string;
  description: string;
  cover: string;
  button?: {
    text: string;
    href?: string;
    src?: string;
    alt?: string;
  };
  image?: 'left' | 'right';
  grayBg?: boolean;
  container?: boolean;
  inversion?: boolean;
}

//TODO: 1) убрать классы false | 2) доработать инверсию и первого блока

export const TextSection = (props: ITextSection) => {
  const isImagePosition = props.image === 'left' && style['about_text__img-left'];
  const isGrayBg = props.grayBg && style['about_text-gray-bg'];

  return (
    <section className={`${style.about_text} ${isImagePosition} ${isGrayBg}`}>
      {props.container && `<div className="container">`}
      <div
        className={style.wrapper}
        style={{
          padding: props.grayBg ? '0' : ' 0 1rem',
        }}
      >
        <div
          className={style.about_text__content}
          style={{
            order: props.inversion ? 1 : 0,
          }}
        >
          <div className={style['about_text__content-wrapper']}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>

            <Button
              text={props.button?.text ?? ''}
              icon={{ src: props.button?.src ?? '', alt: props.button?.alt ?? '' }}
              filled
              dark
            >
              {!props.button?.src && (
                <ArrowRightWhiteIcon style={{ fontSize: '1.563rem', marginLeft: 10 }} />
              )}
            </Button>
          </div>
        </div>

        <Image
          className={style['about_text-img']}
          src={props.cover}
          alt={props.title}
          width={880}
          height={880}
        />
      </div>
      {props.container && `</div>`}
    </section>
  );
};
