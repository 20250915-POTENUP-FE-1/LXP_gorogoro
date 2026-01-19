import Link from 'next/link';
import styles from '@/shared/components/layout/Header.module.css';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { REFRESH_TOKEN } from '@/shared/constants/token';
import { getMe } from '@/services/user.service';
import React from 'react';

export default async function UserNav() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return (
      <Link href="/login" className={styles.dashboardLink}>
        로그인 하기
      </Link>
    );
  }

  try {
    const me = await getMe();

    return (
      <div className={styles.actions}>
        {me?.role === 'INSTRUCTOR' && (
          <Link href="/mypage/instructor" className={styles.dashboardLink}>
            강사 대시보드
          </Link>
        )}
        <Link href="/cart" className={styles.actionButton} aria-label="장바구니">
          <Image src="/assets/shopping-cart.svg" width={20} height={20} alt="" />
        </Link>
        <Link href="/mypage" className={styles.actionButton} aria-label="마이페이지">
          <Image src="/assets/user.svg" width={20} height={20} alt="" />
        </Link>
      </div>
    );
  } catch (error) {
    console.error('AuthControl Error:', error);

    return (
      <Link href="/login" className={styles.dashboardLink}>
        로그인 하기
      </Link>
    );
  }
}
