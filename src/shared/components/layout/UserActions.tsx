import Link from 'next/link';
import styles from '@/shared/components/layout/Header.module.css';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { REFRESH_TOKEN } from '@/shared/constants/token';
import { getMe } from '@/services/user.service';
import React from 'react';
import { refreshApi } from '@/shared/lib/refreshApi';

export default async function UserActions() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return (
      <Link href="/login" className={styles.dashboardLink}>
        로그인 하기
      </Link>
    );
  }
  const me = await getMe().catch(async (error) => refreshApi(error));

  return (
    <div className={styles.actions}>
      {me?.role === 'INSTRUCTOR' && (
        <Link href="/mypage/instructor" className={styles.dashboardLink}>
          강사 대시보드
        </Link>
      )}
      <Link href="/cart" className={styles.actionButton} aria-label="장바구니">
        <Image
          src="/assets/shopping-cart.svg"
          width={10}
          height={10}
          alt=""
          className={styles.actionIcon}
          aria-hidden="true"
        />
      </Link>
      <Link href="/mypage" className={styles.actionButton} aria-label="마이페이지">
        <Image src="/assets/user.svg" width={10} height={10} alt="" className={styles.actionIcon} />
      </Link>
    </div>
  );
}
