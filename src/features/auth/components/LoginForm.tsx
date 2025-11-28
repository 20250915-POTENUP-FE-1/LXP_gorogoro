"use client";

import "./LoginForm.css";

const formData = {
  email: "",
  password: "",
};

const loading = false;
const error = false;

const handleOnChange = () => {
  // 처리 함수
};

const handleSubmit = async () => {
  // 처리 함수
};

export default function LoginForm() {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label className="login-form__field">
        <span className="login-form__label">이메일</span>
        <input
          name="email"
          value={formData.email}
          className="login-form__input"
          type="email"
          placeholder="Enter your email"
          onChange={handleOnChange}
        />
      </label>
      <label className="login-form__field">
        <span className="login-form__label">비밀번호</span>
        <input
          name="password"
          value={formData.password}
          className="login-form__input"
          type="password"
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
      </label>
      {error && <span className="login-form__error-message">{error}</span>}
      <button className="login-form__submit" type="submit">
        로그인
      </button>
    </form>
  );
}
