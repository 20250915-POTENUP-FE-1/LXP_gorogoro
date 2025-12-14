"use client";

import { useEffect, useActionState } from "react";
import { loginAction } from "../actions/login.action";
import styles from "./LoginForm.module.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSearchParams, useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = useModalStore();

  // 로그인 성공 시
  useEffect(() => {
    if (state.success && state.data) {
      setUser({
        nickName: state.data.nickName,
        role: state.data.role,
      });
      const from = searchParams.get("from") || "/";
      router.push(from ? from : "/courses");
    }
  }, [state, setUser, router]);

  // 로그인 실패 시 모달 표시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: "로그인 실패",
        message: state.message,
      });
    }
  }, [state.success, state.message, openModal]);

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
        {state.errors?.password && (
          <span className={styles.errorMessage}>{state.errors.password}</span>
        )}
        {state.errors?.email && (
          <span className={styles.errorMessage}>{state.errors.email}</span>
        )}
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
