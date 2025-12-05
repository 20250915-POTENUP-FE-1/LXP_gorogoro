"use client";

import styles from "./SignupForm.module.css";

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>이름</span>
        <input
          name="displayName"
          value={formData.displayName}
          className={styles.input}
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>이메일</span>
        <input
          name="email"
          value={formData.email}
          className={styles.input}
          type="email"
          placeholder="hello@example.com"
          onChange={handleOnChange}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호</span>
        <input
          name="password"
          value={formData.password}
          className={styles.input}
          type="password"
          placeholder="8자 이상 입력"
          onChange={handleOnChange}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호 확인</span>
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          className={styles.input}
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>회원 유형 선택</legend>
        <div className={styles.userTypes}>
          <label className={styles.userType}>
            <input
              className={styles.radio}
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleOnChange}
            />
            <span className={styles.userTypeLabel}>학생</span>
          </label>
          <label className={styles.userType}>
            <input
              className={styles.radio}
              type="radio"
              name="role"
              value="instructor"
              checked={formData.role === "instructor"}
              onChange={handleOnChange}
            />
            <span className={styles.userTypeLabel}>강사</span>
          </label>
        </div>
      </fieldset>
      {error && <span className={styles.errorMessage}>{error}</span>}
      <button className={styles.submit} type="submit">
        회원가입
      </button>
    </form>
  );
}
