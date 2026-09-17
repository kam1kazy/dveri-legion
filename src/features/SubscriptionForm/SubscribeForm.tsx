'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/shared/ui/Button';
import { ArrowRightWhiteIcon } from '@/shared/ui/Icons';

import styles from './SubscribeForm.module.scss';

export const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !consent) {
      return;
    }

    setIsSuccess(true);
    setEmail('');
    setConsent(false);
  };

  if (isSuccess) {
    return (
      <p className={styles.success} role="status">
        Вы подписаны на рассылку. Спасибо!
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p>Подписаться на рассылку новостей</p>

      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Email *"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />

        <Button type="submit" text="Подписаться" filled dark>
          <ArrowRightWhiteIcon />
        </Button>
      </div>

      <input
        id="footer-form-consent"
        className={styles.checkbox}
        type="checkbox"
        name="consent"
        checked={consent}
        onChange={(event) => setConsent(event.target.checked)}
        required
      />
      <label className={styles.checkboxLabel} htmlFor="footer-form-consent">
        Согласен на обработку персональных данных
      </label>
    </form>
  );
};
