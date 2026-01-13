'use client';

import styles from './MySidebar.module.css';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function MySidebarSelector({
  selectedPath,
  children,
}: {
  selectedPath: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSelected = selectedPath === pathname;
  return (
    <>
      {children}
      <div
        style={{ position: 'absolute', inset: 0 }}
        className={`${styles.navItem} ${isSelected ? styles.navItemActive : ''}`}
      ></div>
    </>
  );
}
