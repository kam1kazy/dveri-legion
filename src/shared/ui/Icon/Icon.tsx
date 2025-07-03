import Image from 'next/image';

interface IProps {
  src: string
  alt: string
  class?: string
  width?: number
  height?: number
}

export const Icon = (props: IProps) => {
  return (
    <Image
      className={props.class}
      src={props.src}
      alt={props.alt || 'icon'}
      width={props.width ?? 20}
      height={props.height ?? 20}
    />
  )
}
