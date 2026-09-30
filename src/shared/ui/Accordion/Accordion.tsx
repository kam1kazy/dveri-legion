'use client';

import { useId, useState } from 'react';

import { ArrowRightIcon } from '@/shared/ui/Icons';

import styles from './Accordion.module.scss';

export interface IAccordion {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion = ({ question, children, defaultOpen = false, className }: IAccordion) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''} ${className ?? ''}`}>
      <button
        id={buttonId}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.question}>{question}</span>
        <ArrowRightIcon className={styles.icon} aria-hidden />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={styles.panel}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelInner}>{children}</div>
      </div>
    </div>
  );
};
