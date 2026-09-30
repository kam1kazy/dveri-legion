import NextImage from 'next/image';
import type { CSSProperties } from 'react';

interface UniversalImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: any;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  useNativeImg?: boolean;
}

export const Image = ({
  src,
  alt = '',
  width = 20,
  height = 20,
  className,
  style,
  useNativeImg = false,
  ...rest
}: UniversalImageProps) => {
  const srcString = typeof src === 'string' ? src : '';
  const isSvg = srcString.endsWith('.svg');
  const isDataOrBlob = srcString.startsWith('data:') || srcString.startsWith('blob:');
  if (useNativeImg || isSvg || isDataOrBlob) {
    return (
      <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};
