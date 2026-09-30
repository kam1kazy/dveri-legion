export interface PromotionSlide {
  id: string;
  discount: string;
  title: string;
  description: string;
  image: string;
  articleSlug: string;
}

export const promotionsSection = {
  title: 'Акции',
  subtitle: 'Актуальные предложения на входные двери — подробности в блоге',
};

export const promotions: PromotionSlide[] = [
  {
    id: 'biometric',
    discount: '−10%',
    title: 'На биометрические замки',
    description: '10% скидка на двери с системами биометрического доступа.',
    image: '/images/promos/biometric.webp',
    articleSlug: 'aktsiya-biometricheskie-zamki',
  },
  {
    id: 'two-doors',
    discount: '−8%',
    title: 'При заказе от 2 дверей',
    description: 'Скидка 8% на весь заказ при покупке двух и более дверей.',
    image: '/images/promos/two-doors.webp',
    articleSlug: 'aktsiya-ot-dvuh-dverey',
  },
  {
    id: 'pensioners',
    discount: '−5%',
    title: 'Пенсионерам',
    description: 'Дополнительная скидка 5% при предъявлении пенсионного удостоверения.',
    image: '/images/promos/pensioners.webp',
    articleSlug: 'aktsiya-pensioneram',
  },
  {
    id: 'svo',
    discount: '−7%',
    title: 'Участникам СВО',
    description: 'Мы уважаем ваш труд — предоставляем 7% скидку на все модели.',
    image: '/images/promos/svo.webp',
    articleSlug: 'aktsiya-uchastnikam-svo',
  },
  {
    id: 'housewarming',
    discount: '−5%',
    title: 'Скидка на новоселье',
    description: 'Получите 5% при покупке двери в новый дом или квартиру.',
    image: '/images/promos/housewarming.webp',
    articleSlug: 'aktsiya-novosele',
  },
];
