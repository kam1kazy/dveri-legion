'use client';

import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { ArrowRightWhiteIcon } from '@/shared/ui/Icons';
import { Input } from '@/shared/ui/Input';
import { RadioGroup } from '@/shared/ui/RadioGroup';
import { Select } from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';

import {
  audienceOptions,
  civilityOptions,
  countryOptions,
  formSections,
  roleOptions,
  sourceOptions,
  subjectOptions,
} from './config/fields';
import style from './ContactForm.module.scss';
import { useContactForm } from './model/useContactForm';

export const ContactForm = () => {
  const { values, errors, isSuccess, setField, handleChange, handleSubmit, reset } =
    useContactForm();

  if (isSuccess) {
    return (
      <div className={style.success}>
        <h3 className={style.successTitle}>Сообщение отправлено</h3>
        <p className={style.successText}>
          Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
        </p>
        <Button type="button" text="Отправить ещё одно" filled dark onClick={reset}>
          <ArrowRightWhiteIcon style={{ fontSize: '1.25rem', marginLeft: 8 }} />
        </Button>
      </div>
    );
  }

  return (
    <form className={style.form} onSubmit={handleSubmit} noValidate>
      <nav className={style.nav} aria-label="Секции формы">
        {formSections.map((section) => (
          <a key={section.id} className={style.navLink} href={`#${section.id}`}>
            {section.label}
          </a>
        ))}
      </nav>

      <div className={style.fields}>
        <section id="information" className={style.section}>
          <h3 className={style.sectionTitle}>Информация</h3>

          <RadioGroup
            name="audience"
            label="Вы"
            options={audienceOptions}
            value={values.audience}
            onChange={(value) => setField('audience', value)}
            required
            error={errors.audience}
          />

          {values.audience === 'professional' && (
            <>
              <Select
                name="role"
                label="Вы"
                options={roleOptions}
                placeholder="Выберите роль"
                value={values.role}
                onChange={handleChange('role')}
                required
                error={errors.role}
              />
              <Input
                name="company"
                label="Компания"
                value={values.company}
                onChange={handleChange('company')}
                required
                error={errors.company}
              />
            </>
          )}

          <Select
            name="source"
            label="Как вы узнали о Legion?"
            options={sourceOptions}
            placeholder="Выберите вариант"
            value={values.source}
            onChange={handleChange('source')}
            required
            error={errors.source}
          />
        </section>

        <section id="contacts" className={style.section}>
          <h3 className={style.sectionTitle}>Контакты</h3>

          <RadioGroup
            name="civility"
            label="Обращение"
            options={civilityOptions}
            value={values.civility}
            onChange={(value) => setField('civility', value)}
            required
            error={errors.civility}
          />

          <div className={style.row}>
            <Input
              name="lastName"
              label="Фамилия"
              value={values.lastName}
              onChange={handleChange('lastName')}
              required
              error={errors.lastName}
            />
            <Input
              name="firstName"
              label="Имя"
              value={values.firstName}
              onChange={handleChange('firstName')}
              required
              error={errors.firstName}
            />
          </div>

          <div className={style.row}>
            <Input
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              required
              error={errors.email}
            />
            <Input
              name="phone"
              type="tel"
              label="Телефон"
              value={values.phone}
              onChange={handleChange('phone')}
              required
              error={errors.phone}
            />
          </div>

          <Input
            name="address"
            label="Адрес"
            value={values.address}
            onChange={handleChange('address')}
            error={errors.address}
          />

          <Select
            name="country"
            label="Страна"
            options={countryOptions}
            value={values.country}
            onChange={handleChange('country')}
            required
            error={errors.country}
          />

          <div className={style.row}>
            <Input
              name="city"
              label="Город"
              value={values.city}
              onChange={handleChange('city')}
              required
              error={errors.city}
            />
            <Input
              name="zip"
              label="Индекс"
              value={values.zip}
              onChange={handleChange('zip')}
              error={errors.zip}
            />
          </div>
        </section>

        <section id="message" className={style.section}>
          <h3 className={style.sectionTitle}>Сообщение</h3>

          <Select
            name="topic"
            label="Сообщение касается"
            options={subjectOptions}
            placeholder="Выберите тему"
            value={values.topic}
            onChange={handleChange('topic')}
            required
            error={errors.topic}
          />

          <Input
            name="subject"
            label="Тема сообщения"
            value={values.subject}
            onChange={handleChange('subject')}
            required
            error={errors.subject}
          />

          <Textarea
            name="message"
            label="Сообщение"
            value={values.message}
            onChange={handleChange('message')}
            required
            error={errors.message}
            rows={6}
          />

          <div className={style.actions}>
            <Checkbox
              name="newsletter"
              label="Хочу получать новости Legion (можно отписаться в любой момент)."
              checked={values.newsletter}
              onChange={handleChange('newsletter')}
            />

            <Checkbox
              name="consent"
              label={
                <span className={style.consentText}>
                  Отправляя форму, я соглашаюсь на обработку указанных данных для ответа на мой
                  запрос.
                </span>
              }
              checked={values.consent}
              onChange={handleChange('consent')}
              required
              error={errors.consent}
            />

            <Button type="submit" text="Отправить" filled dark>
              <ArrowRightWhiteIcon style={{ fontSize: '1.25rem', marginLeft: 8 }} />
            </Button>
          </div>
        </section>
      </div>
    </form>
  );
};
