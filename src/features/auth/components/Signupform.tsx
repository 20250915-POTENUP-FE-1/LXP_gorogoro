'use client';

import { useActionState, useEffect } from 'react';
import styles from './SignupForm.module.css';
import { registAction, RegistFormData } from '../actions/regist.action';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore';
import { Button } from '@/shared/components/ui/button/Button';
import FieldInput from '@/shared/components/ui/FieldInput';

const initialState = {
  success: false,
  data: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  },
  message: '',
  errors: {},
} satisfies ActionState<RegistFormData>;

export default function SignupForm() {
  const [state, formAction] = useActionState(registAction, initialState);
  const router = useRouter();
  const { openModal } = useModalStore();

  //회원가입 성공시
  useEffect(() => {
    if (state.success === true) {
      openModal({
        title: '회원가입 성공',
        message: state.message || '회원가입이 완료되었습니다.',
        onConfirm: () => router.push('/login'),
      });
    }
  }, [state, router, openModal]);

  //회원가입 실패시 모달 표시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: '회원가입 실패',
        message: state.message,
      });
    }
  }, [state.success, state.message, openModal]);

  return (
    <form action={formAction} className={styles.form}>
      <FieldInput
        label="이름"
        id="name"
        name="name"
        type="text"
        placeholder="이름을 입력하세요"
        defaultValue={state.data?.name ?? ''}
        errorMessage={state.errors?.name}
      />

      <FieldInput
        label="이메일"
        id="email"
        name="email"
        type="email"
        placeholder="hello@example.com"
        defaultValue={state.data?.email ?? ''}
        errorMessage={state.errors?.email}
      />

      <FieldInput
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="8자 이상 입력"
        defaultValue={state.data?.password ?? ''}
        errorMessage={state.errors?.password}
      />

      <FieldInput
        label="비밀번호 확인"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="8자 이상 입력"
        defaultValue={state.data?.confirmPassword ?? ''}
        errorMessage={state.errors?.confirmPassword}
      />

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>회원 유형 선택</legend>
        <select
          className={styles.userTypes}
          name="role"
          id="role"
          defaultValue={state.data?.role ?? 'STUDENT'}
          aria-label="회원 유형 선택"
        >
          <option className={styles.userType} value="STUDENT">
            학생
          </option>
          <option className={styles.userType} value="INSTRUCTOR">
            강사
          </option>
        </select>
      </fieldset>

      <Button variant="submit" size="full" type="submit">
        회원가입
      </Button>
    </form>
  );
}
