import type { IRadioOption } from '@/shared/ui/RadioGroup';
import type { ISelectOption } from '@/shared/ui/Select';

export const audienceOptions: IRadioOption[] = [
  { value: 'private', label: 'Частное лицо' },
  { value: 'professional', label: 'Профессионал' },
];

export const roleOptions: ISelectOption[] = [
  { value: 'dealer', label: 'Дилер' },
  { value: 'installer', label: 'Установщик' },
  { value: 'architect', label: 'Архитектор' },
  { value: 'designer', label: 'Дизайнер' },
  { value: 'other', label: 'Другое' },
];

export const sourceOptions: ISelectOption[] = [
  { value: 'internet', label: 'Интернет' },
  { value: 'exhibition', label: 'Выставка' },
  { value: 'dealer', label: 'Дилер / партнёр' },
  { value: 'recommendation', label: 'Рекомендация' },
  { value: 'press', label: 'Пресса' },
  { value: 'other', label: 'Другое' },
];

export const civilityOptions: IRadioOption[] = [
  { value: 'ms', label: 'Г-жа' },
  { value: 'mr', label: 'Г-н' },
];

export const countryOptions: ISelectOption[] = [
  { value: 'ru', label: 'Россия' },
  { value: 'by', label: 'Беларусь' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'other', label: 'Другая страна' },
];

export const subjectOptions: ISelectOption[] = [
  { value: 'measurement', label: 'Замер' },
  { value: 'quote', label: 'Расчёт' },
  { value: 'catalog', label: 'Каталог' },
  { value: 'partnership', label: 'Сотрудничество' },
  { value: 'other', label: 'Другое' },
];

export const formSections = [
  { id: 'information', label: 'Информация' },
  { id: 'contacts', label: 'Контакты' },
  { id: 'message', label: 'Сообщение' },
] as const;
