'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { DropdownId } from '../config/nav';

const CLOSE_DELAY_MS = 160;

export const useHeaderMenu = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [contentDropdown, setContentDropdown] = useState<DropdownId | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockOpen = useRef(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const open = useCallback(
    (id: DropdownId) => {
      if (lockOpen.current) {
        return;
      }

      clearCloseTimer();
      setOpenDropdown(id);
      setContentDropdown(id);
    },
    [clearCloseTimer]
  );

  const keepOpen = useCallback(() => {
    if (lockOpen.current) {
      return;
    }

    clearCloseTimer();
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    lockOpen.current = false;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const collapse = useCallback(() => {
    clearCloseTimer();
    setOpenDropdown(null);
    setContentDropdown(null);
    setIsMobileOpen(false);
  }, [clearCloseTimer]);

  const closeNow = useCallback(() => {
    lockOpen.current = true;
    collapse();
  }, [collapse]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    collapse();
  }, [pathname, collapse]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return {
    openDropdown,
    contentDropdown,
    isMobileOpen,
    isLight: openDropdown !== null,
    open,
    close,
    closeNow,
    keepOpen,
    toggleMobile,
  };
};
