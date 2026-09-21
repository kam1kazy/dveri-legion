import type { ReactNode } from 'react';

import type { DoorBenefitIconId } from '@/entities/door';

interface BenefitIconProps {
  id: DoorBenefitIconId;
  className?: string;
}

const paths: Record<DoorBenefitIconId, ReactNode> = {
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.9 7.7 7 9 4.1-1.3 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
  lock: (
    <>
      <rect x="6" y="11" width="12" height="9" rx="1.5" />
      <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  fire: (
    <path d="M12 21c4 0 6-2.7 6-6.2 0-3.2-2-5-3.4-6.3-.3 2.1-1.4 3-2.4 3.3C13 8 11.4 5.8 12 3c-3.5 1.8-6 5.3-6 9.2C6 18 8.3 21 12 21Z" />
  ),
  thermometer: (
    <>
      <path d="M10 14.5V6.5a2 2 0 1 1 4 0v8a3 3 0 1 1-4 0Z" />
      <path d="M12 17.5v-7" />
    </>
  ),
  sound: (
    <>
      <path d="M10 9H7v6h3l4 3V6l-4 3Z" />
      <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  seal: (
    <>
      <rect x="4.5" y="5.5" width="15" height="13" rx="1.5" />
      <path d="M8 9.5h8M8 12.5h8M8 15.5h5" />
    </>
  ),
  mirror: (
    <>
      <rect x="7" y="3.5" width="10" height="17" rx="1.5" />
      <path d="M9.5 7.5h5" />
    </>
  ),
  glass: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M5 12h14M12 4v16" />
    </>
  ),
  hinge: (
    <>
      <rect x="4.5" y="5" width="6" height="14" rx="1" />
      <rect x="13.5" y="5" width="6" height="14" rx="1" />
      <path d="M10.5 8h3M10.5 12h3M10.5 16h3" />
    </>
  ),
  paint: (
    <>
      <path d="M6 14.5h7.5a2.5 2.5 0 0 0 0-5H14" />
      <path d="M14 4.5v5H8.5A2.5 2.5 0 0 1 6 7V4.5" />
      <path d="M9 14.5v5h4v-5" />
    </>
  ),
  panel: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  wood: (
    <>
      <path d="M7 4h10l2 4H5l2-4Z" />
      <path d="M5 8h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8Z" />
      <path d="M12 8v12" />
    </>
  ),
  wide: (
    <>
      <path d="M4 8v8M20 8v8" />
      <path d="M7 12h10" />
      <path d="m9.5 9.5-2.5 2.5 2.5 2.5M14.5 9.5l2.5 2.5-2.5 2.5" />
    </>
  ),
  home: (
    <>
      <path d="m4 11 8-7 8 7" />
      <path d="M7 10.5V19h10v-8.5" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
};

export const BenefitIcon = ({ id, className }: BenefitIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {paths[id]}
  </svg>
);
