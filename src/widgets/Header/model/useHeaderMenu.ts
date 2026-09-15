'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { DropdownId } from '../config/nav';

const CLOSE_DELAY_MS = 160;

export const useHeaderMenu = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [contentDropdown, setContentDropdown] = useState<DropdownId | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const open = useCallback(
    (id: DropdownId) => {
      clearCloseTimer();
      setOpenDropdown(id);
      setContentDropdown(id);
    },
    [clearCloseTimer]
  );

  const keepOpen = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

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
    keepOpen,
    toggleMobile,
  };
};
