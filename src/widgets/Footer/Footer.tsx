import NextLink from 'next/link';

import { SubscribeForm } from '@/features/SubscriptionForm';
import { Button } from '@/shared/ui/Button';
import { ArrowRightIcon } from '@/shared/ui/Icons';
import { Image } from '@/shared/ui/Image/Image';
import { Link } from '@/shared/ui/Link';

import {
  footerBottomLinks,
  footerFeedback,
  footerMenu,
  footerParallax,
} from './config/footer';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.wrapper}>
          <div className={styles.feedback}>
            <p className={styles.feedbackHeader}>
              {footerFeedback.headerLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < footerFeedback.headerLines.length - 1 && <br />}
                </span>
              ))}
            </p>

            <Button
              className={styles.feedbackButton}
              text={footerFeedback.button.text}
              link={footerFeedback.button.href}
              filled
            >
              <ArrowRightIcon />
            </Button>

            <p className={styles.feedbackContact}>
              {footerFeedback.contact.address}{' '}
              <a href={footerFeedback.contact.phoneHref}>{footerFeedback.contact.phone}</a>
            </p>
          </div>

          <div className={styles.sidebar}>
            <nav className={styles.menu} aria-label="Меню футера">
              <ul>
                {footerMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} text={item.title} />
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.subscribe}>
              <SubscribeForm />

              <p className={styles.copyright}>
                Этот веб-сайт защищён reCAPTCHA и{' '}
                <a href="/documents">Политика конфиденциальности</a>, а также{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                  Условия использования
                </a>{' '}
                Google.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <NextLink href="/">
              <Image
                src="/images/logo_legion-light.svg"
                alt="Legion"
                width={100}
                height={55}
              />
            </NextLink>
          </div>

          <div className={styles.bottomLinks}>
            <ul>
              {footerBottomLinks.map((item) => (
                <li key={item.id}>
                  {item.href ? <Link href={item.href} text={item.title} /> : item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.parallax}>
        <h5>
          {footerParallax.lines.map((line, index) => (
            <span key={line}>
              {line}
              {index < footerParallax.lines.length - 1 && <br />}
            </span>
          ))}
        </h5>
      </div>
    </footer>
  );
};
