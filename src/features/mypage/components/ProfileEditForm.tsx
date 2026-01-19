'use client';

import styles from './ProfileEditForm.module.css';
import { Button } from '@/shared/components/ui/Button';
import FieldInput from '@/shared/components/ui/FieldInput';
import React, { useActionState, useEffect } from 'react';
import { updateProfileAction } from '@/features/mypage/actions/UpdateProfileAction';
import { useModalStore } from '@/stores/useModalStore';
import { useRouter } from 'next/navigation';

const initialState = {
  success: false,
  message: '',
  error: {},
};

export default function ProfileEditForm({ email, name }: { email: string; name: string }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);
  const { openModal } = useModalStore();
  const router = useRouter();

  // 프로필 수정 성공시
  useEffect(() => {
    if (state.success === true) {
      openModal({
        title: '프로필 수정 성공',
        message: state.message,
        onConfirm: () => {
          router.push('/mypage');
        },
      });
    }
  }, [state, openModal, router]);

  // 프로필 수정 실패시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: '프로필 수정 실패',
        message: '프로필 수정에 실패했습니다.',
      });
    }
  }, [state.success, state.message, openModal]);

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
        />

        <FieldInput
          label="이름"
          id="name"
          name="name"
          defaultValue={name}
          placeholder="이름을 입력하세요"
        />

        <FieldInput
          label="비밀번호 변경"
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="변경할 비밀번호를 입력하세요"
        />

        <FieldInput
          label="비밀번호 변경 확인"
          type="password"
          id="newPasswordCheck"
          name="newPasswordCheck"
          errorMessage={state.errors?.newPasswordCheck?.[0] ?? ''}
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type="submit" variant="save" disabled={isPending}>
          저장하기
        </Button>
      </div>
    </form>
  );
}
