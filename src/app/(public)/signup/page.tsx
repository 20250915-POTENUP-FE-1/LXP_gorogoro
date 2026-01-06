import styles from './page.module.css';
import SignupForm from '@/features/auth/components/Signupform';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입 후 강의 수강과 학습 관리 기능을 바로 시작하세요.',
};

export default function SignupPage() {
  return (
    <section className={styles.page}>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.intro}>
            <h1 className={styles.title}>회원가입</h1>
            <p className={styles.description}>GOROGORO에 오신 것을 환영합니다.</p>
          </div>
          <SignupForm />
        </div>
        <p className={styles.footer}>
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className={styles.footerLink}>
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
