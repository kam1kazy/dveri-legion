import { Image } from '@/shared/ui/Image/Image';

import type { ILocation } from '../config/contacts';
import style from './LocationCard.module.scss';

interface ILocationCardProps {
  location: ILocation;
}

export const LocationCard = ({ location }: ILocationCardProps) => {
  const variantClass =
    location.variant === 'showroom' ? style['card--showroom'] : style['card--office'];

  return (
    <article className={`${style.card} ${variantClass}`}>
      {location.image && (
        <Image
          className={style.image}
          src={location.image}
          alt={location.title}
          width={880}
          height={660}
        />
      )}

      <div className={style.content}>
        <h3 className={style.title}>{location.title}</h3>

        {location.description && <p className={style.description}>{location.description}</p>}

        <div className={style.address}>
          {location.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {location.phone && (
            <a className={style.phone} href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}>
              {location.phone}
            </a>
          )}
        </div>

        <a
          className={style.mapLink}
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Показать карту
        </a>
      </div>
    </article>
  );
};
