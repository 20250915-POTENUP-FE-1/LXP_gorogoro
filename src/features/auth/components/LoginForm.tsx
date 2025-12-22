"use client";

import { useEffect, useActionState } from "react";
import { loginAction } from "../actions/login.action";
import styles from "./LoginForm.module.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSearchParams, useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import { Button, Input, Label } from "@/shared/components/ui";

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

  // 로그인 성공시
  useEffect(() => {
    if (state.success && state.data) {
      setUser({
        nickname: state.data.nickname,
        role: state.data.role,
      });
      const from = searchParams.get("from") || "/";
      router.push(from);
    }
  }, [state, setUser, router]);

  // 로그인 실패시 모달 표시
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
      <div className={styles.field}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          error={state.errors?.email}
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          error={state.errors?.password}
        />
      </div>
      <Button type="submit" size="lg" fullWidth isLoading={isPending}>
        로그인
      </Button>
    </form>
  );
}
