import style from './ArticleBadge.module.scss';

interface ArticleBadgeProps {
  text?: string;
  className?: string;
}

export const ArticleBadge = ({ text = 'Новинка', className }: ArticleBadgeProps) => {
  return <span className={`${style.badge} ${className ?? ''}`.trim()}>{text}</span>;
};
