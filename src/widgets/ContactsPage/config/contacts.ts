export interface ILocation {
  id: string;
  title: string;
  description?: string;
  address: string[];
  phone?: string;
  mapUrl: string;
  image?: string;
  variant?: 'showroom' | 'office';
}

export const contactsPage = {
  title: 'Связаться с нами',
  subtitle: 'Мы на связи',
};

export const locations: ILocation[] = [
  {
    id: 'showroom',
    title: 'Шоурум',
    description:
      'Вы профессионал и хотите познакомиться с нашей продукцией? Приглашаем в шоурум — только по предварительной записи.',
    address: ['г. Москва', 'ул. Примерная, 10'],
    phone: '+7 (495) 000-00-00',
    mapUrl: 'https://yandex.ru/maps/',
    image: '/images/img5.jpg',
    variant: 'showroom',
  },
  {
    id: 'office',
    title: 'Офис',
    address: ['Legion', 'г. Москва', 'ул. Примерная, 10'],
    phone: '+7 (495) 000-00-00',
    mapUrl: 'https://yandex.ru/maps/',
    variant: 'office',
  },
];
