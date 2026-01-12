'use client';

import * as React from 'react';
import Link from 'next/link';
import styles from './error.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const [copied, setCopied] = React.useState(false);

  const message = error?.message || '알 수 없는 오류가 발생했습니다.';
  const digest = error?.digest;

  const copyDebug = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({ message, digest, at: new Date().toISOString() }, null, 2),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard 실패는 무시
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <span className={styles.icon}>⚠️</span>
          </div>

          <h1 className={styles.title}>문제가 발생했어요</h1>
          <p className={styles.subtitle}>
            잠시 후 다시 시도해 주세요. 계속 발생하면 관리자에게 문의해 주세요.
          </p>

          <div className={styles.debugBox}>
            <p className={styles.debugLabel}>오류 메시지</p>
            <p className={styles.debugMessage}>{message}</p>

            {digest && (
              <>
                <p className={styles.debugLabel} style={{ marginTop: '0.75rem' }}>
                  Digest
                </p>
                <p className={`${styles.digest} ${styles.mono}`}>{digest}</p>
              </>
            )}

            <div className={styles.actionsRow}>
              <button type="button" onClick={copyDebug} className={styles.btn}>
                {copied ? '복사됨' : '디버그 정보 복사'}
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={styles.secondaryBtn}
            >
              새로고침
            </button>

            <Link href="/" className={`${styles.secondaryBtn} ${styles.linkBtn}`}>
              홈으로
            </Link>
          </div>
        </div>

        <p className={styles.footnote}>
          * 이 페이지는 해당 라우트 세그먼트의 <code className={styles.mono}>error.tsx</code> 에러
          바운더리입니다.
        </p>
      </div>
    </div>
  );
}
