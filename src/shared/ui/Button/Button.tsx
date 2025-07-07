import { Icon } from '@/shared/ui/Icons';
import { Link } from '../Link';
import styles from './Button.module.scss';

export interface IButton {
  id?: number;
  text: string;
  link?: string;
  ancher?: boolean;
  filled?: boolean;
  className?: string;
  border?: boolean;
  icon?: {
    src: string;
    alt: string;
  };
  dark?: boolean;
  children?: React.ReactNode;
}

export const Button = (props: IButton) => {
  const href = props.link ? (props.ancher ? `#${props.link}` : props.link) : '#';
  const isFilled = `${props.filled ? styles.filled : styles['outline-border']}`;
  const isDark = `${props.dark && styles['filled-dark']}`;
  const isBorder = `${props.border && styles['filled-border']}`;

  return (
    <Link
      text={props.text}
      href={href}
      className={`${props.className} ${styles.button} ${isBorder} ${isFilled} ${isDark} ${props.icon?.src && styles['animate-icon']}`}
    >
      {props?.children}
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
