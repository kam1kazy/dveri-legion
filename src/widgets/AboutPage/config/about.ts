import type { ITextSection } from '@/shared/ui/TextSection/TextSection';

export const aboutPage = {
  title: 'О компании',
  description:
    'Legion Doors — прочность, стиль и надёжность. Более десяти лет проектируем, производим и устанавливаем входные двери премиум-класса по всей России.',
};

export const aboutHero = {
  title: 'О компании',
  links: [
    { text: 'Выбрать свою дверь', href: '/' },
    { text: 'Вдохновение', href: '/gallery' },
    { text: 'Техническое описание', href: '/documents' },
    { text: 'Документация', href: '/documents' },
  ],
};

export const aboutArt = {
  lead: 'Изысканные формы и безупречная детализация делают наши коллекции незаменимыми для создания теплой и уютной атмосферы в вашем доме, гостинице или любом другом проекте.',
  accent: 'Позвольте вашим интерьерам говорить',
  rest: 'на языке изысканности с дверями, которые подчеркнут ваш высокий статус и утонченный вкус.',
  cover: '/images/catalog/art-door.png',
  alt: 'Дверь Legion в интерьере',
};

export const aboutHarmony = {
  title: 'Двери Legion — это гармония стиля и функциональности.',
  subtitle: 'Каждый элемент материализует ваше стремление к совершенству.',
  items: [
    {
      id: 'locks',
      title: 'Надежные замки',
      cover: '/images/catalog/adv_1.png',
      alt: 'Надежные замки',
    },
    {
      id: 'handles',
      title: 'Износостойкие ручки',
      cover: '/images/catalog/adv_2.png',
      alt: 'Прочные ручки',
    },
    {
      id: 'hinges',
      title: 'Бесшумные петли',
      cover: '/images/catalog/adv_3.png',
      alt: 'Тихие петли',
    },
  ],
};

export const aboutStorySections: ITextSection[] = [
  {
    id: 1,
    title: 'Собственное производство',
    description:
      'Заводы Legion оснащены современным оборудованием и работают по европейским стандартам качества. Каждый этап — от резки стали до сборки и окраски — проходит под контролем, чтобы дверь служила годами без сюрпризов.',
    cover: '/images/img-tech.jpg',
    button: {
      text: 'Посмотреть работы',
      href: '/gallery',
    },
    image: 'left',
    grayBg: false,
    inversion: true,
  },
  {
    id: 2,
    title: 'Материалы с характером',
    description:
      'Используем только сертифицированные компоненты: холоднокатаную сталь, утеплители последнего поколения и замки ведущих брендов. Так двери сохраняют внешний вид и держат тепло даже в суровом климате.',
    cover: '/images/img6.jpg',
    button: {
      text: 'Как мы работаем',
      href: '/buyers',
    },
    grayBg: true,
    inversion: false,
  },
  {
    id: 3,
    title: 'Качество и доверие',
    description:
      'Мы создаём входные двери, в которых сочетаются надёжность, теплоизоляция и эстетика. Каждая модель проходит испытания, а на металлоконструкцию действует гарантия до трёх лет.',
    cover: '/images/img7.jpg',
    button: {
      text: 'Связаться с нами',
      href: '/contacts',
    },
    grayBg: false,
    inversion: false,
  },
];

export const aboutReasons = [
  {
    id: 'strength',
    title: 'Прочные конструкции',
    description: 'Жёсткий короб и полотно, продуманная фурнитура и внимание к каждому узлу.',
  },
  {
    id: 'design',
    title: 'Современный дизайн',
    description: 'Отделки и детали, которые подчёркивают архитектуру дома или квартиры.',
  },
  {
    id: 'production',
    title: 'Контроль на заводе',
    description: 'Собственное производство — от раскроя металла до финишной отделки.',
  },
  {
    id: 'delivery',
    title: 'Доставка и монтаж',
    description: 'Собственная логистика и установка по Москве, области и регионам России.',
  },
  {
    id: 'personal',
    title: 'Индивидуальный подход',
    description: 'Подбираем конфигурацию под проём, климат и бюджет — без лишней воды.',
  },
];
