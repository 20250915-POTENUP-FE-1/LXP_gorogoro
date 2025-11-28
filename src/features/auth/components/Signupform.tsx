"use client";

import "./SignupForm.css";

const formData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const loading = false;
const error = false;

const handleOnChange = () => {
  console.log("환영해");
};

const handleSubmit = () => {
  console.log("환영해");
};

export default function SignupForm() {
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="signup-form__field">
        <span className="signup-form__label">이름</span>
        <input
          name="displayName"
          value={formData.displayName}
          className="signup-form__input"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">이메일</span>
        <input
          name="email"
          value={formData.email}
          className="signup-form__input"
          type="email"
          placeholder="hello@example.com"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호</span>
        <input
          name="password"
          value={formData.password}
          className="signup-form__input"
          type="password"
          placeholder="8자 이상 입력"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호 확인</span>
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          className="signup-form__input"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <fieldset className="signup-form__fieldset">
        <legend className="signup-form__legend">회원 유형 선택</legend>
        <div className="signup-form__user-types">
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleOnChange}
            />
            <span className="signup-form__user-type-label">학생</span>
          </label>
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="role"
              value="instructor"
              checked={formData.role === "instructor"}
              onChange={handleOnChange}
            />
            <span className="signup-form__user-type-label">강사</span>
          </label>
        </div>
      </fieldset>
      {error && <span className="signup-form__error-message">{error}</span>}
      <button className="signup-form__submit" type="submit">
        회원가입
      </button>
    </form>
  );
}
