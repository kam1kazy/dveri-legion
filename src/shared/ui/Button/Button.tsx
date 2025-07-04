import { Icon } from '../Icon';
import { Link } from '../Link';
import styles from './Button.module.scss';

export interface IButton {
  id?: number;
  text: string;
  link?: string;
  ancher?: boolean;
  filled?: boolean;
  className?: string;
  icon?: {
    src: string;
    alt: string;
  };
}

export const Button = (props: IButton) => {
  const href = props.link ? (props.ancher ? `#${props.link}` : props.link) : '#';
  const isFilled = `${styles.button} ${props.filled ? styles.filled : styles['outline-border']}`;
  return (
    <Link
      text={props.text}
      href={href}
      className={`${props.className} ${isFilled} ${props.icon?.src && styles['animate-icon']}`}
    >
      {props.icon?.src && (
        <Icon
          className={styles.button__icon}
          src={props.icon?.src ?? ''}
          alt={props.icon?.alt || 'icon'}
        />
      )}
    </Link>
  );
};
