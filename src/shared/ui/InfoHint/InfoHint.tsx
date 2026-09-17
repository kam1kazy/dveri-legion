'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { FilterHint } from '@/entities/door/model/filterHints';

import styles from './InfoHint.module.scss';

interface InfoHintProps extends FilterHint {
  label: string;
  className?: string;
}

type TooltipCoords = { top: number; left: number; placement: 'top' | 'bottom' };

export const InfoHint = ({ label, description, pros, cons, className }: InfoHintProps) => {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<TooltipCoords | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const tooltip = tooltipRef.current?.getBoundingClientRect();
      if (!trigger) {
        return;
      }

      const width = tooltip?.width ?? 260;
      const height = tooltip?.height ?? 120;
      const gap = 8;
      const margin = 12;

      let left = trigger.left + trigger.width / 2 - width / 2;
      left = Math.min(Math.max(margin, left), window.innerWidth - width - margin);

      const spaceBelow = window.innerHeight - trigger.bottom;
      const placement: 'top' | 'bottom' =
        spaceBelow < height + gap && trigger.top > height + gap ? 'top' : 'bottom';

      const top =
        placement === 'bottom' ? trigger.bottom + gap : trigger.top - height - gap;

      setCoords({ top, left, placement });
    };

    updatePosition();
    const frame = requestAnimationFrame(updatePosition);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, description, pros, cons]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || tooltipRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const show = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setOpen(true);
  };

  const hide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <span className={`${styles.root} ${className ?? ''}`}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={`Что такое «${label}»`}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
          }
          setOpen((current) => !current);
        }}
      >
        ?
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`${styles.tooltip} ${coords?.placement === 'top' ? styles.top : styles.bottom}`}
            style={
              coords
                ? { top: coords.top, left: coords.left, visibility: 'visible' }
                : { visibility: 'hidden' }
            }
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            <p className={styles.description}>{description}</p>
            {pros && pros.length > 0 && (
              <div className={styles.block}>
                <span className={styles.blockLabel}>Плюсы</span>
                <ul>
                  {pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {cons && cons.length > 0 && (
              <div className={styles.block}>
                <span className={`${styles.blockLabel} ${styles.cons}`}>Минусы</span>
                <ul>
                  {cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>,
          document.body
        )}
    </span>
  );
};
