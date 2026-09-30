export interface ILocation {
  id: string;
  title: string;
  description?: string;
  address: string[];
  phone?: string;
  email?: string;
  mapUrl?: string;
  image?: string;
  messengers?: { label: string; href: string }[];
}

export const contactsPage = {
  title: 'Связаться с нами',
  subtitle: 'Мы на связи',
};

export const locations: ILocation[] = [
  {
    id: 'office',
    title: 'Офис и производство',
    description: 'Производство и офис в Клину. Работаем по предварительной записи.',
    address: [
      'ООО «ЛЕГИОН ДОРС»',
      'Московская область, г. Клин',
      'ул. Лесопарковая, д. 86',
      'Пн–Сб: 9:00–19:00, Вс: выходной',
    ],
    phone: '+7 (999) 508-88-58',
    email: 'legiondoors@yandex.ru',
    mapUrl: 'https://yandex.ru/maps/?text=Клин%2C%20Лесопарковая%2086',
    image: '/images/img6.jpg',
  },
  {
    id: 'field',
    title: 'Выезд по России',
    description:
      'Замерщик приедет в удобное время, снимет размеры и покажет образцы покрытий и фурнитуры. Работаем по Москве, области и регионам.',
    address: ['Выезд замерщика и монтаж — по предварительной записи'],
    phone: '+7 (999) 508-88-58',
    email: 'legiondoors@yandex.ru',
    image: '/images/img4.jpg',
    messengers: [
      { label: 'Telegram', href: 'https://t.me/' },
      { label: 'WhatsApp', href: 'https://wa.me/79995088858' },
      { label: 'Max', href: '#' },
    ],
  },
];

export const companyRequisites = {
  title: 'Реквизиты компании',
  items: [
    { label: 'Наименование', value: 'ООО «ЛЕГИОН ДОРС»' },
    {
      label: 'Юридический адрес',
      value: '141604, Московская область, г.о. Клин, г. Клин, ул. Лесопарковая, д. 86',
    },
    { label: 'ИНН', value: '5020095063' },
    { label: 'КПП', value: '502001001' },
    { label: 'ОГРН', value: '1265000009890' },
    { label: 'Банк', value: 'ПАО Сбербанк' },
    { label: 'Р/с', value: '40702810740070008357' },
    { label: 'К/с', value: '30101810400000000225' },
    { label: 'БИК', value: '044525225' },
  ],
};
