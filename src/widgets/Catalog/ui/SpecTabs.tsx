'use client';

import { useId, useState } from 'react';

import type { DoorSpecTab } from '@/entities/door';

import styles from './SpecTabs.module.scss';

interface SpecTabsProps {
  tabs: DoorSpecTab[];
}

export const SpecTabs = ({ tabs }: SpecTabsProps) => {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  if (tabs.length === 0) {
    return null;
  }

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className={styles.root}>
      <div className={styles.tabList} role="tablist" aria-label="Категории характеристик">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              className={`${styles.tab} ${selected ? styles.tabActive : ''}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeTab.id}`}
        aria-labelledby={`${baseId}-${activeTab.id}`}
        className={styles.panel}
      >
        <dl className={styles.rows}>
          {activeTab.rows.map((row) => (
            <div key={`${row.label}-${row.value}`} className={styles.row}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
