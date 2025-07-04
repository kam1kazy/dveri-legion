import NextLink from 'next/link';

export interface ILink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const Link = ({ href, className, text, children, ...rest }: ILink) => {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {text}
      </a>
    );
  }

  return (
    <NextLink href={href} passHref className={className} {...rest}>
      {text}
      {children}
    </NextLink>
  );
};
