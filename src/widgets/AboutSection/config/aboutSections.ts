import { ITextSection } from '@/shared/ui/TextSection/TextSection';

export const aboutSectionsList: ITextSection[] = [
  {
    id: 1,
    title: 'Конфигурации',
    description:
      'Персонализируйте свои двери в несколько кликов с помощью нашего онлайн-конструктора и подберите стоимость конфигурации, чтобы воплотить ваш проект в жизнь.',
    cover: '/images/img2.jpg',
    button: {
      text: 'Собрать свою дверь',
      href: '#',
      src: '/images/icons/setting.svg',
      alt: 'Настройки',
    },
    image: 'left',
    grayBg: false,
    inversion: true,
  },
  {
    id: 2,
    title: 'Визуализация в 3D',
    description:
      'Когда старый закончит фичу вы откройте для себя все виды отделки наших коллекций в 3D и получите рецептурный лист.\n\nИспользуйте дополненную реальность на своем смартфоне, чтобы смоделировать интеграцию наших дверей в ваше пространство.',
    cover: '/images/img3.jpg',
    button: {
      text: 'Запустить визуализация в 3D',
      href: '#',
    },
    grayBg: true,
    inversion: false,
  },
  {
    id: 3,
    title: 'Экспертиза',
    description:
      'Будучи экспертами в проектировании и производстве любых дверей, мы гарантируем высокое качество и прозначные оценки.\n\nДинамика между формой, функцией и отделкой лежит в основе нашей работы, предлагаем честный и контролируемый дизайн.',
    cover: '/images/img4.jpg',
    button: {
      text: 'Подробнее о нас',
      href: '#',
    },
    grayBg: false,
    inversion: false,
  },
];
