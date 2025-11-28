import "./SignupPage.css";
import SignupForm from "@/features/auth/components/Signupform";
import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="signup-page">
      <div className="signup-page__main">
        <div className="signup-page__card">
          <div className="signup-page__intro">
            <h1 className="signup-page__title">회원가입</h1>
            <p className="signup-page__description">
              GOROGORO에 오신 것을 환영합니다.
            </p>
          </div>
          <SignupForm />
        </div>
        <p className="signup-page__footer">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="signup-page__footer-link">
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
