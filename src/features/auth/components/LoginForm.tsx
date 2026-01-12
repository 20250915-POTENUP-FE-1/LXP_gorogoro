'use client';

import { useEffect, useActionState } from 'react';
import { loginAction } from '../actions/login.action';
import styles from './LoginForm.module.css';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore';
import { Button } from '@/shared/components/ui/Button';
import FieldInput from '@/shared/components/ui/FieldInput';

const initialState = {
  success: false,
  message: '',
  errors: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const setUser = useAuthStore((state) => state.setUser);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = useModalStore();

  // 로그인 성공시
  useEffect(() => {
    if (state.success && state.data) {
      console.log(state.data);
      setUser({
        nickname: state.data.nickname,
        role: state.data.role,
        email: state.data.email ?? '',
      });
      const callback = searchParams.get('callback') || '/';
      // proxy가 /login으로 리다이렉트할 때 URL에 추가한 복귀 경로
      router.push(callback);
    }
  }, [state, setUser, router, searchParams]);

  // 로그인 실패시 모달 표시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: '로그인 실패',
        message: state.message,
      });
    }
  }, [state.success, state.message, openModal]);

  return (
    <form action={formAction} className={styles.form}>
      <FieldInput
        label="이메일"
        name="email"
        type="email"
        placeholder="Enter your email"
        errorMessage={state.errors?.email}
      />
      <FieldInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="Enter your password"
        errorMessage={state.errors?.password}
      />

      <Button variant="submit" type="submit">
        {isPending ? '로그인 하는 중...' : '로그인'}
      </Button>
    </form>
  );
}
