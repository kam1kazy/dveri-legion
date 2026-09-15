'use client';

import { useCallback, useState } from 'react';

import type { DropdownId } from '../config/nav';

export const useHeaderMenu = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownId | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const open = useCallback((id: DropdownId) => {
    setOpenDropdown(id);
  }, []);

  const close = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  return {
    openDropdown,
    isMobileOpen,
    isLight: openDropdown !== null,
    open,
    close,
    toggleMobile,
  };
};
