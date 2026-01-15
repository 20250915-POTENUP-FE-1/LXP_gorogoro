'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getMe } from '@/services/user.service';
import { getRefreshApi } from '@/shared/lib/getRefreshApi';
import { groupFieldErrors } from '@/shared/utils/groupFieldErrors';

export type UpdateProfileActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function updateProfileAction(
  _prev: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  const email = (formData.get('email') ?? '').toString().trim();
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

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return { success: false, message: '로그인이 필요합니다.' };

  const payload: Record<string, string> = {
    email,
    name,
    newPassword,
    newPasswordCheck,
  };
  if (newPassword) payload.passwordEncrypted = newPassword;

  const res = await fetch(`${process.env.API_BASE_URL}users/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  }).catch(async (error) => getRefreshApi(error));

  if (!res.ok) {
    let msg = '프로필 수정에 실패했습니다.';
    let mapped: Record<string, string[]> | undefined;

    try {
      const data = (await res.json()) as { message?: string; errors?: FieldError[] };
      msg = data?.message ?? msg;

      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        mapped = groupFieldErrors(data.errors);
      }
    } catch {}

    return {
      success: false,
      message: msg,
      ...(mapped ? { errors: mapped } : {}),
    };
  }

  revalidatePath(`/mypage`);
  return { success: true };
}
