"use client";

import { useActionState, useEffect } from "react";
import styles from "./SignupForm.module.css";
import { registAction } from "../actions/regist.action";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function SignupForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    registAction,
    initialState
  );
  useEffect(() => {
    if (state.success === true) {
      alert(state.message);
      router.push("/login");
    }
  }, [state, router]);
  return (
    <form action={formAction} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>이름</span>
        <input
          name="name"
          id="name"
          className={styles.input}
          type="text"
          placeholder="이름을 입력하세요"
        />
        {state.errors?.name && (
          <span className={styles.errorMessage}>{state.errors.name}</span>
        )}
      </label>
      <label className={styles.field}>
        <span className={styles.label}>이메일</span>
        <input
          name="email"
          id="email"
          className={styles.input}
          type="email"
          placeholder="hello@example.com"
        />
        {state.errors?.email && (
          <span className={styles.errorMessage}>{state.errors.email}</span>
        )}
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호</span>
        <input
          name="password"
          id="password"
          className={styles.input}
          type="password"
          placeholder="8자 이상 입력"
        />
        {state.errors?.password && (
          <span className={styles.errorMessage}>{state.errors.password}</span>
        )}
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호 확인</span>
        <input
          name="confirmPassword"
          id="confirmPassword"
          className={styles.input}
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
        />
        {state.errors?.confirmPassword && (
          <span className={styles.errorMessage}>{state.errors.confirmPassword}</span>
        )}
      </label>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>회원 유형 선택</legend>
        <select
          className={styles.userTypes}
          name="role"
          id="role"
          defaultValue="STUDENT"
        >
          <option className={styles.userType} value="STUDENT">
            학생
          </option>
          <option className={styles.userType} value="INSTRUCTOR">
            강사
          </option>
        </select>
      </fieldset>

      {!state.success && state.message && (
        <span className={styles.errorMessage}>{state.message}</span>
      )}
      <button className={styles.submit} type="submit">
        회원가입
      </button>
    </form>
  );
}
