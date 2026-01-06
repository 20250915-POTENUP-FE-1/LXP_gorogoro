import styles from './page.module.css';
import LoginForm from '@/features/auth/components/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인 후 수강, 장바구니, 마이페이지 기능을 이용하세요.',
};

export default function LoginPage() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <div className={styles.illustration}>
          <div className={styles.illustrationContent}>
            <div style={{ position: 'relative', width: 320, height: 350 }}>
              <Image
                fill
                className={styles.illustrationImage}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt3Z9MrMi0I99SK_HYjJb0WlT6pzfG3F96hwg4EFBWs4dSaNVaZ8iYnUSt8sDRI3pERhF5Obro2NY3EJT_96K3Ox1J7hB9s-WIVO2yDUsX9teGrCJ8RcW_mpOWAP-yLsQ7xeEU7mRSYBks0ZqkGO4FzJS7BSv9kbXO_pvBM5Eq5lCBM91loCeNFHcrcMLu3bR1Oaq1vmRj-TCvS082VAMOiQ6OTrVI8t0DWkpym0JsG6xRKt0GgOcv2ZBwrTsx8J0HlJ7iYcVtlEY"
                alt="People collaborating around a laptop, representing online learning."
              />
            </div>
            <h2 className={styles.illustrationTitle}>지식의 세계를 열어보세요</h2>
            <p className={styles.illustrationDescription}>
              GOROGORO와 함께 성장의 여정을 시작하세요.
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.brand}>
            <p className={styles.logo}>GOROGORO</p>
            <p className={styles.subtitle}>로그인</p>
          </div>
          <LoginForm />
          <p className={styles.caption}>
            계정이 없으신가요?{' '}
            <Link href="/signup" className={styles.link}>
              회원가입하기
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
