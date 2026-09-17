export interface SaleItemConfig {
  doorId: string;
  discount: number;
  badge: string;
}

export const saleSection = {
  title: 'Распродажа',
  subtitle: 'Скидки на популярные конфигурации — двери на заказ',
};

/** Те же позиции и скидки, что на legion-doors.ru */
export const saleItems: SaleItemConfig[] = [
  { doorId: '1023', discount: 10, badge: '3 контура' },
  { doorId: '1016', discount: 10, badge: '3 контура' },
  { doorId: '1664', discount: 12, badge: 'Терморазрыв' },
  { doorId: '1613', discount: 12, badge: 'Терморазрыв' },
  { doorId: '1614', discount: 8, badge: 'МДФ' },
  { doorId: '1432', discount: 7, badge: 'Порошок' },
  { doorId: '1509', discount: 7, badge: 'Выгодно' },
  { doorId: '1552', discount: 7, badge: 'Выгодно' },
];
