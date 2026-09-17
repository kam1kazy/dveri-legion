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
export type ContactFormStep = 0 | 1 | 2;

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

const STEP_FIELDS: Record<ContactFormStep, (keyof IContactFormValues)[]> = {
  0: ['audience', 'role', 'company', 'source'],
  1: ['civility', 'lastName', 'firstName', 'email', 'phone', 'country', 'city'],
  2: ['topic', 'subject', 'message', 'consent'],
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: IContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!values.audience) {
    errors.audience = 'Выберите вариант';
  }
  if (values.audience === 'professional') {
    if (!values.role) {
      errors.role = 'Выберите роль';
    }
    if (!values.company.trim()) {
      errors.company = 'Укажите компанию';
    }
  }
  if (!values.source) {
    errors.source = 'Выберите вариант';
  }

  if (!values.civility) {
    errors.civility = 'Выберите обращение';
  }
  if (!values.lastName.trim()) {
    errors.lastName = 'Укажите фамилию';
  }
  if (!values.firstName.trim()) {
    errors.firstName = 'Укажите имя';
  }
  if (!values.email.trim()) {
    errors.email = 'Укажите email';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Некорректный email';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Укажите телефон';
  }
  if (!values.country) {
    errors.country = 'Выберите страну';
  }
  if (!values.city.trim()) {
    errors.city = 'Укажите город';
  }

  if (!values.topic) {
    errors.topic = 'Выберите тему';
  }
  if (!values.subject.trim()) {
    errors.subject = 'Укажите тему сообщения';
  }
  if (!values.message.trim()) {
    errors.message = 'Введите сообщение';
  }
  if (!values.consent) {
    errors.consent = 'Необходимо согласие';
  }

  return errors;
};

const pickStepErrors = (values: IContactFormValues, step: ContactFormStep): ContactFormErrors => {
  const all = validate(values);
  const errors: ContactFormErrors = {};

  STEP_FIELDS[step].forEach((field) => {
    if (all[field]) {
      errors[field] = all[field];
    }
  });

  return errors;
};

export const useContactForm = () => {
  const [values, setValues] = useState<IContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState<ContactFormStep>(0);
  const [maxReached, setMaxReached] = useState<ContactFormStep>(0);

  const setField = <K extends keyof IContactFormValues>(name: K, value: IContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }
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

  const goToStep = (target: ContactFormStep) => {
    if (target === step || target > maxReached) {
      return;
    }
    setStep(target);
    setErrors({});
  };

  const goNext = () => {
    const nextErrors = pickStepErrors(values, step);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || step >= 2) {
      return;
    }

    const nextStep = (step + 1) as ContactFormStep;
    setStep(nextStep);
    setMaxReached((prev) => (nextStep > prev ? nextStep : prev));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < 2) {
      goNext();
      return;
    }

    const nextErrors = pickStepErrors(values, 2);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setIsSuccess(true);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSuccess(false);
    setStep(0);
    setMaxReached(0);
  };

  return {
    values,
    errors,
    isSuccess,
    step,
    maxReached,
    setField,
    handleChange,
    handleSubmit,
    goToStep,
    goNext,
    reset,
  };
};
