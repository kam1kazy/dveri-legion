import Image from 'next/image';

export interface IIcon {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Icon = (props: IIcon) => {
  return (
    <Image
      className={props.className}
      src={props.src}
      alt={props.alt || 'icon'}
      width={props.width ?? 20}
      height={props.height ?? 20}
    />
  );
};
