import NextImage from 'next/image';

interface UniversalImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  useNativeImg?: boolean;
}

export const Image = ({
  src,
  alt = '',
  width = 20,
  height = 20,
  className,
  useNativeImg = false,
  ...rest
}: UniversalImageProps) => {
  const isSvg = src.endsWith('.svg');
  if (useNativeImg || isSvg) {
    return (
      <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />
    );
  }

  return <NextImage src={src} alt={alt} width={width} height={height} className={className} />;
};
