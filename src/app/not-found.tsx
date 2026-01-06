import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

export default async function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <span className={styles.icon}>🔎</span>
          </div>

          <h1 className={styles.title}>페이지를 찾을 수 없어요</h1>
          <p className={styles.subtitle}>주소가 잘못되었거나, 삭제된 페이지일 수 있습니다.</p>

          <div className={styles.grid}>
            <Link href="/" className={styles.primaryLink}>
              홈으로
            </Link>

            <Link href="/login" className={styles.secondaryLink}>
              로그인으로
            </Link>
          </div>

          <div className={styles.helpBox}>
            <p className={styles.helpTitle}>도움말</p>
            <ul className={styles.helpList}>
              <li className={styles.helpListItem}>URL 오타가 없는지 확인</li>
              <li className={styles.helpListItem}>로그인 후 접근 가능한 페이지인지 확인</li>
              <li className={styles.helpListItem}>메뉴에서 다시 이동</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
