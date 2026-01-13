'use client';
import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';
import styles from '@/shared/components/layout/Header.module.css';

export default function IsRole() {
  const userProfile = useAuthStore((state) => state.userProfile);

  return (
    userProfile?.role === 'INSTRUCTOR' && (
      <Link href="/mypage/instructor" className={styles.dashboardLink}>
        강사 대시보드
      </Link>
    )
  );
}
