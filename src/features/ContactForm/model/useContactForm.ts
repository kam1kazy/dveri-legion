'use client';

import { useState } from 'react';

export interface IContactFormValues {
  audience: string;
  role: string;
  company: string;
  source: string;
  civility: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  topic: string;
  subject: string;
  message: string;
  newsletter: boolean;
  consent: boolean;
}

export type ContactFormErrors = Partial<Record<keyof IContactFormValues, string>>;

const initialValues: IContactFormValues = {
  audience: 'private',
  role: '',
  company: '',
  source: '',
  civility: '',
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  address: '',
  country: 'ru',
  city: '',
  zip: '',
  topic: '',
  subject: '',
  message: '',
  newsletter: false,
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: IContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!values.audience) errors.audience = 'Выберите вариант';
  if (values.audience === 'professional') {
    if (!values.role) errors.role = 'Выберите роль';
    if (!values.company.trim()) errors.company = 'Укажите компанию';
  }
  if (!values.source) errors.source = 'Выберите вариант';

  if (!values.civility) errors.civility = 'Выберите обращение';
  if (!values.lastName.trim()) errors.lastName = 'Укажите фамилию';
  if (!values.firstName.trim()) errors.firstName = 'Укажите имя';
  if (!values.email.trim()) {
    errors.email = 'Укажите email';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Некорректный email';
  }
  if (!values.phone.trim()) errors.phone = 'Укажите телефон';
  if (!values.country) errors.country = 'Выберите страну';
  if (!values.city.trim()) errors.city = 'Укажите город';

  if (!values.topic) errors.topic = 'Выберите тему';
  if (!values.subject.trim()) errors.subject = 'Укажите тему сообщения';
  if (!values.message.trim()) errors.message = 'Введите сообщение';
  if (!values.consent) errors.consent = 'Необходимо согласие';

  return errors;
};

export const useContactForm = () => {
  const [values, setValues] = useState<IContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const setField = <K extends keyof IContactFormValues>(name: K, value: IContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleChange =
    (name: keyof IContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = event.target;
      const value =
        target instanceof HTMLInputElement && target.type === 'checkbox'
          ? target.checked
          : target.value;
      setField(name, value as IContactFormValues[typeof name]);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSuccess(true);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSuccess(false);
  };

  return {
    values,
    errors,
    isSuccess,
    setField,
    handleChange,
    handleSubmit,
    reset,
  };
};
