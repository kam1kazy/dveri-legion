import type { ReactNode } from 'react';

import { Header } from '@/widgets/Header';

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header solid />
      <main>{children}</main>
    </>
  );
}
