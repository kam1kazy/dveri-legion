import { Button } from '../Button';
import { ArrowRightIcon, ArrowRightWhiteIcon } from '../Icons';
import style from './TextCard.module.scss';

export interface ITextCard {
  id?: number;
  title: string;
  description: string;
  button?: {
    text: string;
    href?: string;
  };
  dark?: boolean;
}

export const TextCard = (props: ITextCard) => {
  return (
    <div className={`${style['text_card']} ${props.dark && style['text_card--dark']}`}>
      <h4>{props.title}</h4>
      <p>{props.description}</p>

      <Button
        link={props.button?.href}
        className={`${props.dark ? style['filled-hover'] : style['filled-dark']} button`}
        text={props.button?.text || ''}
        filled
        dark={!props.dark}
      >
        {props.dark ? <ArrowRightIcon /> : <ArrowRightWhiteIcon />}
      </Button>
    </div>
  );
};
