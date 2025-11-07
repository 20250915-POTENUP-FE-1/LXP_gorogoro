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
        <div className="login-form__password">
          <input
            className="login-form__input login-form__input--password"
            type="password"
            placeholder="Enter your password"
          />
          <span className="login-form__password-icon material-symbols-outlined">
            visibility
          </span>
        </div>
      </label>
      <button className="login-form__submit" type="button">
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
