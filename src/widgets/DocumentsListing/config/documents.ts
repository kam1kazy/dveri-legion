import type { IDocument } from '@/entities/document';

export interface IDocumentCategory {
  id: string;
  label: string;
  previewCount: number;
  documents: IDocument[];
}

export const documentCategories: IDocumentCategory[] = [
  {
    id: 'catalogues',
    label: 'Каталоги',
    previewCount: 2,
    documents: [
      {
        id: 'cat-1',
        title: 'Каталог коллекций Legion',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img2.jpg',
      },
      {
        id: 'cat-2',
        title: 'Прайс-лист 2026',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img3.jpg',
      },
    ],
  },
  {
    id: 'certificates',
    label: 'Сертификаты',
    previewCount: 4,
    documents: [
      {
        id: 'cert-1',
        title: 'Сертификат соответствия ГОСТ',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img-tech.jpg',
      },
      {
        id: 'cert-2',
        title: 'Пожарная безопасность',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img4.jpg',
      },
      {
        id: 'cert-3',
        title: 'Экологический сертификат',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img5.jpg',
      },
      {
        id: 'cert-4',
        title: 'Протокол испытаний',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img6.jpg',
      },
      {
        id: 'cert-5',
        title: 'Декларация о соответствии',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img7.jpg',
      },
      {
        id: 'cert-6',
        title: 'Сертификат ISO',
        href: '#',
        fileType: 'PDF',
        cover: '/images/promo.jpg',
      },
    ],
  },
  {
    id: 'installation',
    label: 'Монтаж',
    previewCount: 4,
    documents: [
      {
        id: 'inst-1',
        title: 'Инструкция по монтажу входных дверей',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img-how.jpg',
      },
      {
        id: 'inst-2',
        title: 'Подготовка проёма',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img2.jpg',
      },
      {
        id: 'inst-3',
        title: 'Установка фурнитуры',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img3.jpg',
      },
      {
        id: 'inst-4',
        title: 'Схема крепления коробки',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img4.jpg',
      },
      {
        id: 'inst-5',
        title: 'Регулировка петель',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img5.jpg',
      },
      {
        id: 'inst-6',
        title: 'Чек-лист после монтажа',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img6.jpg',
      },
    ],
  },
  {
    id: 'warranty',
    label: 'Гарантия',
    previewCount: 2,
    documents: [
      {
        id: 'war-1',
        title: 'Гарантийный талон',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img-garant.jpg',
      },
      {
        id: 'war-2',
        title: 'Условия гарантийного обслуживания',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img7.jpg',
      },
    ],
  },
  {
    id: 'manuals',
    label: 'Инструкции',
    previewCount: 4,
    documents: [
      {
        id: 'man-1',
        title: 'Руководство по эксплуатации',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img-blog.jpg',
      },
      {
        id: 'man-2',
        title: 'Уход за покрытием',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img2.jpg',
      },
      {
        id: 'man-3',
        title: 'Настройка замков',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img3.jpg',
      },
      {
        id: 'man-4',
        title: 'Замена уплотнителей',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img4.jpg',
      },
      {
        id: 'man-5',
        title: 'Частые вопросы по эксплуатации',
        href: '#',
        fileType: 'PDF',
        cover: '/images/img5.jpg',
      },
      {
        id: 'man-6',
        title: 'Рекомендации по хранению',
        href: '#',
        fileType: 'PNG',
        cover: '/images/img6.jpg',
      },
    ],
  },
];
