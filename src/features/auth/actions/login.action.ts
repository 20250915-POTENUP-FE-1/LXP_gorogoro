'use server';

import { validateLoginForm } from '../validate';
import { LoginRequest, LoginResponse } from '../types';
import { loginUser } from '@/services/auth.service';

export const loginAction = async (
  prevState: ActionState<LoginResponse>,
  formData: FormData,
): Promise<ActionState<LoginResponse>> => {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const validation = validateLoginForm({ email, password });
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const payload: LoginRequest = { email, password };
  return await loginUser(payload);
};
