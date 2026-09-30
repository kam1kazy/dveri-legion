import type { ITextSection } from '@/shared/ui/TextSection/TextSection';

export const aboutSectionsList: ITextSection[] = [
  {
    id: 1,
    title: 'Бесплатный замер',
    description:
      'Оставьте заявку — специалист бесплатно приедет на замер, поможет с выбором и оформит договор.\n\nДальше изготовим дверь, доставим в удобное время и установим с гарантией.',
    cover: '/images/img2.jpg',
    button: {
      text: 'Вызвать замерщика',
      href: '/contacts',
    },
    image: 'left',
    grayBg: false,
    inversion: true,
  },
  {
    id: 2,
    title: 'Конфигурации',
    description:
      'Подберём дверь под вашу задачу: для дома или квартиры, с терморазрывом или усиленной шумоизоляцией, в нужной отделке и бюджете.\n\nРазница в цене — это конкретные узлы и материалы. Объясним, что именно делает дверь теплее, тише и надёжнее.',
    cover: '/images/img3.jpg',
    button: {
      text: 'Подобрать дверь',
      href: '/catalog',
      src: '/images/icons/setting.svg',
      alt: 'Настройки',
    },
    grayBg: true,
    inversion: false,
  },
  {
    id: 3,
    title: 'Экспертиза',
    description:
      'ЛЕГИОН — современные входные двери: надёжность, стиль и тепло в каждом доме.\n\nСобственное производство, контроль на каждом этапе и доставка по Москве и Московской области собственной логистикой.',
    cover: '/images/img4.jpg',
    button: {
      text: 'Подробнее о нас',
      href: '/about',
    },
    grayBg: false,
    inversion: false,
  },
];
