'use client';

import styles from './ProfileEditForm.module.css';
import { Button } from '@/shared/components/ui/Button';
import FieldInput from '@/shared/components/ui/FieldInput';
import React, { useActionState } from 'react';
import {
  updateProfileAction,
  UpdateProfileActionState,
} from '@/features/mypage/actions/UpdateProfileAction';

const initialState: UpdateProfileActionState = { success: true };

export default function ProfileEditForm({
  email,
  nickname,
  name,
}: {
  email: string;
  nickname: string;
  name?: string;
}) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <div className={styles.avatarPlaceholder} aria-hidden="true">
            👤
          </div>
        </div>
        <Button variant="avatar">이미지 변경</Button>
      </div>

      <div className={styles.grid}>
        <FieldInput
          label="이메일"
          type="email"
          id="email"
          name="email"
          value={email}
          readOnly
          inputStyle={{
            backgroundColor: 'var(--gray-50)',
            color: 'var(--gray-500)',
            cursor: 'default',
            borderColor: 'transparent',
          }}
          errorMessage={state.errors?.email}
        />

        <FieldInput
          label="닉네임"
          id="nickname"
          name="nickname"
          defaultValue={nickname}
          placeholder="닉네임을 입력하세요"
          errorMessage={state.errors?.nickname}
        />

        <FieldInput
          label="비밀번호 변경"
          id="password"
          name="password"
          type="password"
          placeholder="변경할 비밀번호를 입력하세요"
          errorMessage={state.errors?.password}
        />

        <FieldInput
          label="비밀번호 변경 확인"
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          errorMessage={state.errors?.passwordConfirm}
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button
          type="submit"
          style={{
            ...saveButtonStyle,
          }}
          disabled={isPending}
        >
          저장하기
        </button>
      </div>
    </form>
  );
}

export const saveButtonStyle: React.CSSProperties = {
  backgroundColor: '#0f172a', // 거의 검정(슬레이트900 느낌)
  color: '#ffffff',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '7px',
  padding: '16px 18px',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: 1,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, transform 150ms ease, opacity 150ms ease',
};
