import "./LoginPage.css";
import LoginForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section className="login-page">
      <div className="login-page__card">
        <div className="login-page__illustration">
          <div className="login-page__illustration-content">
            <img
              className="login-page__illustration-image"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt3Z9MrMi0I99SK_HYjJb0WlT6pzfG3F96hwg4EFBWs4dSaNVaZ8iYnUSt8sDRI3pERhF5Obro2NY3EJT_96K3Ox1J7hB9s-WIVO2yDUsX9teGrCJ8RcW_mpOWAP-yLsQ7xeEU7mRSYBks0ZqkGO4FzJS7BSv9kbXO_pvBM5Eq5lCBM91loCeNFHcrcMLu3bR1Oaq1vmRj-TCvS082VAMOiQ6OTrVI8t0DWkpym0JsG6xRKt0GgOcv2ZBwrTsx8J0HlJ7iYcVtlEY"
              alt="People collaborating around a laptop, representing online learning."
            />
            <h2 className="login-page__illustration-title">
              지식의 세계를 열어보세요
            </h2>
            <p className="login-page__illustration-description">
              GOROGORO와 함께 성장의 여정을 시작하세요.
            </p>
          </div>
        </div>
        <div className="login-page__content">
          <div className="login-page__brand">
            <p className="login-page__logo">GOROGORO</p>
            <p className="login-page__subtitle">로그인</p>
          </div>
          <LoginForm />
          <p className="login-page__caption">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="login-page__link">
              회원가입하기
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
