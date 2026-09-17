export interface IGalleryItem {
  id: string;
  src: string;
  alt: string;
  categoryId: string;
}

export interface IGalleryCategory {
  id: string;
  label: string;
}

export const galleryPage = {
  title: 'Фотогалерея',
  description:
    'Примеры установленных дверей Legion: в подъезд, дом и квартиру, а также противопожарные и технические решения.',
};

export const galleryCategories: IGalleryCategory[] = [
  { id: 'all', label: 'Все' },
  { id: 'v-podezd', label: 'В подъезд' },
  { id: 'v-dom', label: 'В дом' },
  { id: 'v-kvartiru', label: 'В квартиру' },
  { id: 'protivopozharnye', label: 'Противопожарные' },
  { id: 'technicheskie', label: 'Технические' },
];

export const galleryItems: IGalleryItem[] = [
  {
    id: 'podezd-83',
    src: '/images/gallery/v-podezd/v-podezd-83.webp',
    alt: 'Входная дверь в подъезд',
    categoryId: 'v-podezd',
  },
  {
    id: 'podezd-31',
    src: '/images/gallery/v-podezd/v-podezd-31.webp',
    alt: 'Дверь в подъезд с отделкой',
    categoryId: 'v-podezd',
  },
  {
    id: 'podezd-24',
    src: '/images/gallery/v-podezd/v-podezd-24.webp',
    alt: 'Установка двери в подъезде',
    categoryId: 'v-podezd',
  },
  {
    id: 'podezd-93',
    src: '/images/gallery/v-podezd/v-podezd-93.webp',
    alt: 'Металлическая дверь в подъезд',
    categoryId: 'v-podezd',
  },
  {
    id: 'podezd-10',
    src: '/images/gallery/v-podezd/v-podezd-10.webp',
    alt: 'Дверь в подъездном пространстве',
    categoryId: 'v-podezd',
  },
  {
    id: 'podezd-80',
    src: '/images/gallery/v-podezd/v-podezd-80.webp',
    alt: 'Готовая установка в подъезде',
    categoryId: 'v-podezd',
  },
  {
    id: 'dom-150',
    src: '/images/gallery/v-dom/v-dom-150.webp',
    alt: 'Входная дверь в загородный дом',
    categoryId: 'v-dom',
  },
  {
    id: 'dom-110',
    src: '/images/gallery/v-dom/v-dom-110.webp',
    alt: 'Дверь для частного дома',
    categoryId: 'v-dom',
  },
  {
    id: 'dom-70',
    src: '/images/gallery/v-dom/v-dom-70.webp',
    alt: 'Уличная дверь с отделкой',
    categoryId: 'v-dom',
  },
  {
    id: 'dom-116',
    src: '/images/gallery/v-dom/v-dom-116.webp',
    alt: 'Входная группа частного дома',
    categoryId: 'v-dom',
  },
  {
    id: 'dom-115',
    src: '/images/gallery/v-dom/v-dom-115.webp',
    alt: 'Дверь в коттедж',
    categoryId: 'v-dom',
  },
  {
    id: 'dom-157',
    src: '/images/gallery/v-dom/v-dom-157.webp',
    alt: 'Фасадная дверь Legion',
    categoryId: 'v-dom',
  },
  {
    id: 'kvartiru-64',
    src: '/images/gallery/v-kvartiru/v-kvartiru-64.webp',
    alt: 'Входная дверь в квартиру',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'kvartiru-42',
    src: '/images/gallery/v-kvartiru/v-kvartiru-42.webp',
    alt: 'Квартирная дверь с зеркалом',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'kvartiru-79',
    src: '/images/gallery/v-kvartiru/v-kvartiru-79.webp',
    alt: 'Установка двери в квартире',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'kvartiru-47',
    src: '/images/gallery/v-kvartiru/v-kvartiru-47.webp',
    alt: 'Дверь в квартиру с МДФ',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'kvartiru-15',
    src: '/images/gallery/v-kvartiru/v-kvartiru-15.webp',
    alt: 'Входная дверь в жилой комплекс',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'kvartiru-40',
    src: '/images/gallery/v-kvartiru/v-kvartiru-40.webp',
    alt: 'Готовая квартира с дверью Legion',
    categoryId: 'v-kvartiru',
  },
  {
    id: 'pp-75',
    src: '/images/gallery/protivopozharnye/protivopozharnye-75.webp',
    alt: 'Противопожарная дверь',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'pp-18',
    src: '/images/gallery/protivopozharnye/protivopozharnye-18.webp',
    alt: 'Противопожарная конструкция',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'pp-82',
    src: '/images/gallery/protivopozharnye/protivopozharnye-82.webp',
    alt: 'Установка противопожарной двери',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'pp-158',
    src: '/images/gallery/protivopozharnye/protivopozharnye-158.webp',
    alt: 'Противопожарная дверь на объекте',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'pp-71',
    src: '/images/gallery/protivopozharnye/protivopozharnye-71.webp',
    alt: 'Противопожарное полотно Legion',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'pp-1',
    src: '/images/gallery/protivopozharnye/protivopozharnye-1.webp',
    alt: 'Противопожарная дверь EI',
    categoryId: 'protivopozharnye',
  },
  {
    id: 'tech-15',
    src: '/images/gallery/technicheskie/technicheskie-15.webp',
    alt: 'Техническая дверь',
    categoryId: 'technicheskie',
  },
  {
    id: 'tech-9',
    src: '/images/gallery/technicheskie/technicheskie-9.webp',
    alt: 'Техническая дверь на объекте',
    categoryId: 'technicheskie',
  },
  {
    id: 'tech-21',
    src: '/images/gallery/technicheskie/technicheskie-21.webp',
    alt: 'Техническая металлическая дверь',
    categoryId: 'technicheskie',
  },
  {
    id: 'tech-33',
    src: '/images/gallery/technicheskie/technicheskie-33.webp',
    alt: 'Установка технической двери',
    categoryId: 'technicheskie',
  },
  {
    id: 'tech-24',
    src: '/images/gallery/technicheskie/technicheskie-24.webp',
    alt: 'Техническая дверь Legion',
    categoryId: 'technicheskie',
  },
  {
    id: 'tech-42',
    src: '/images/gallery/technicheskie/technicheskie-42.webp',
    alt: 'Техническое решение для объекта',
    categoryId: 'technicheskie',
  },
];
