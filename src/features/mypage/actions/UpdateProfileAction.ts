'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type UpdateProfileActionState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function updateProfileAction(
  _prev: UpdateProfileActionState,
  formData: FormData,
): Promise<UpdateProfileActionState> {
  const email = (formData.get('email') ?? '').toString().trim();
  const password = (formData.get('password') ?? '').toString();
  const passwordConfirm = (formData.get('passwordConfirm') ?? '').toString();
  const name = (formData.get('name') ?? '').toString().trim();

  const errors: Record<string, string> = {};

  if (!name) errors.name = '닉네임은 필수입니다.';
  else if (name.length < 2) errors.name = '닉네임은 2자 이상이어야 합니다.';

  if (password) {
    if (password.length < 8) errors.password = '비밀번호는 8자 이상이어야 합니다.';
    if (!passwordConfirm) errors.passwordConfirm = '비밀번호 확인은 필수입니다.';
    else if (password !== passwordConfirm) errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  if (Object.keys(errors).length) return { success: false, errors };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return { success: false, message: '로그인이 필요합니다.' };

  const payload: Record<string, string> = { email, name };
  if (password) payload.passwordEncrypted = password;

  const res = await fetch(`${process.env.API_BASE_URL}users/modify`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    let msg = '프로필 수정에 실패했습니다.';
    try {
      const data = await res.json();
      msg = data?.message ?? msg;
    } catch {}
    return { success: false, message: msg };
  }

  revalidatePath(`/mypage`);
  return { success: true };
}
