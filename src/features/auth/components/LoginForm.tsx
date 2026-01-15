'use client';

import { useEffect, useActionState, useState } from 'react';
import { loginAction } from '../actions/login.action';
import styles from './LoginForm.module.css';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import FieldInput from '@/shared/components/ui/FieldInput';
import NewModal from '@/shared/components/ui/NewModal';

const initialState = {
  success: false,
  message: '',
  errors: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [attempt, setAttempt] = useState(0);
  const [dismissedAttempt, setDismissedAttempt] = useState(-1);

  const isOpen = !state.success && !!state.message && attempt !== dismissedAttempt;
  // 로그인 성공시
  useEffect(() => {
    if (state.success && state.data) {
      setUser({
        nickname: state.data.nickname,
        role: state.data.role,
        email: state.data.email ?? '',
      });
      router.push('courses');
    }
  }, [state, setUser, router]);

  return (
    <form
      action={(fd) => {
        setAttempt((n) => n + 1);
        formAction(fd);
      }}
      className={styles.form}
    >
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

      <NewModal
        title="로그인 실패"
        message={state.message ?? ''}
        isOpen={isOpen}
        onCancel={() => setDismissedAttempt(attempt)}
      />
    </form>
  );
}
