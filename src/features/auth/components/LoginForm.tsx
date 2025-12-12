"use client";

import { useEffect, useActionState } from "react";
import { loginAction } from "../actions";
import styles from "./LoginForm.module.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.data) {
      setUser({
        nickName: state.data.nickName,
        role: state.data.role,
      });
      router.push("/courses");
    }
  }, [state, setUser]);

  return (
    <form action={formAction} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>이메일</span>
        <input
          name="email"
          className={styles.input}
          type="email"
          placeholder="Enter your email"
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호</span>
        <input
          name="password"
          className={styles.input}
          type="password"
          placeholder="Enter your password"
        />
      </label>
      {!state.success && state.message && (
        <span className={styles.errorMessage}>{state.message}</span>
      )}
      <button className={styles.submit} type="submit">
        {isPending ? "로그인 하는 중..." : "로그인"}
      </button>
    </form>
  );
}
