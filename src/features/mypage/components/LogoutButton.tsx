'use client';

import React from 'react';
import styles from './MySidebar.module.css';
import { logoutAction } from '@/features/auth/actions/logout.action';

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutAction(); // 서버 쿠키 삭제 및 리다이렉트
  };

  return (
    <button className={styles.navItem} type="button" onClick={handleLogout}>
      로그아웃
    </button>
  );
}
