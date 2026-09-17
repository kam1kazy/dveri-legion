import { Suspense } from 'react';

import { Catalog } from '@/widgets/Catalog/Catalog';

export const CatalogPage = () => {
  return (
    <main>
      <Suspense>
        <Catalog />
      </Suspense>
    </main>
  );
};
