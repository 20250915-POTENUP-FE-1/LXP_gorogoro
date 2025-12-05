"use client";

import styles from "./LoginForm.module.css";

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>이메일</span>
        <input
          name="email"
          value={formData.email}
          className={styles.input}
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
      </label>
      {error && <span className={styles.errorMessage}>{error}</span>}
      <button className={styles.submit} type="submit">
        로그인
      </button>
    </form>
  );
}
