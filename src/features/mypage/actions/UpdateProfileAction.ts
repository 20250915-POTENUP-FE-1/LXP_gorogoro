'use server';

import { revalidatePath } from 'next/cache';
import { getRefreshApi } from '@/shared/lib/getRefreshApi';
import { groupFieldErrors } from '@/shared/utils/groupFieldErrors';
import { updateMe } from '@/services/user.service';

export type UpdateProfileActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function updateProfileAction(
  _prev: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  const newPassword = (formData.get('newPassword') ?? '').toString();
  const newPasswordCheck = (formData.get('newPasswordCheck') ?? '').toString();
  const name = (formData.get('name') ?? '').toString().trim();

  const errors: Record<string, string[]> = {};

  if (!name) errors.name = ['이름은 필수입니다.'];
  else if (name.length < 2) errors.name = ['이름은 2자 이상이어야 합니다.'];

  if (newPassword) {
    if (newPassword.length < 8) errors.newPassword = ['비밀번호는 8자 이상이어야 합니다.'];
    if (!newPasswordCheck) errors.newPasswordCheck = ['비밀번호 확인은 필수입니다.'];
    else if (newPassword !== newPasswordCheck)
      errors.newPasswordCheck = ['비밀번호가 일치하지 않습니다.'];
  }

  if (Object.keys(errors).length) return { success: false, errors };

  const payload = {
    name,
    newPassword,
    newPasswordCheck,
  };

  try {
    await updateMe(payload);
    revalidatePath('/mypage');
    return {
      success: true,
      message: '프로필이 성공적으로 수정되었습니다.',
    };
  } catch (error) {
    await getRefreshApi(error);
    let mappedErrors: Record<string, string[]>;
    if (Array.isArray(error.errors)) {
      mappedErrors = groupFieldErrors(error.errors);
    }

    return {
      success: false,
      message: '프로필 수정에 실패했습니다.',
      errors: mappedErrors,
    };
  }
}
