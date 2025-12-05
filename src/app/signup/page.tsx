import styles from "./page.module.css";
import SignupForm from "@/features/auth/components/Signupform";
import Link from "next/link";

export default function SignupPage() {
  return (
    <section className={styles.page}>
      <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.intro}>
            <h1 className={styles.title}>회원가입</h1>
            <p className={styles.description}>
              GOROGORO에 오신 것을 환영합니다.
            </p>
          </div>
          <SignupForm />
        </div>
        <p className={styles.footer}>
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className={styles.footerLink}>
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
