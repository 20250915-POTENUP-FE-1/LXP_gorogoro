import "./LoginForm.css";

function LoginForm() {
  return (
    <form className="login-form">
      <label className="login-form__field">
        <span className="login-form__label">이메일</span>
        <input
          className="login-form__input"
          type="email"
          placeholder="Enter your email"
        />
      </label>
      <label className="login-form__field">
        <span className="login-form__label">비밀번호</span>
        <input
          className="login-form__input"
          type="password"
          placeholder="Enter your password"
        />
      </label>
      <button className="login-form__submit" type="button">
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
