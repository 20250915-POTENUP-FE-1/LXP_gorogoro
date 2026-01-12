'use server';

import { loginUser } from '@/services/auth.service';
import { LoginRequest, LoginUserInfo } from '../types';
import { cookies } from 'next/headers';
import { validateLoginForm } from '../validate';
import { isBackendError } from '@/shared/types/types';
import { mapAuthError } from '../utils/authErrorMapper';

type ActionState<T> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};

export const loginAction = async (
  prevState: ActionState<LoginUserInfo>,
  formData: FormData,
): Promise<ActionState<LoginUserInfo>> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validation = validateLoginForm({ email, password });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const payload: LoginRequest = {
    email,
    password,
  };

  try {
    const data = await loginUser(payload);

    // loginUser 에서 응답으로 받은 토큰(accessToken,refreshToken)을 HttpOnly 쿠키로 저장
    // 프론트는 이 응답받은 토큰을 어딘가에 저장해야 다음 요청에서 사용 가능 -> 보안상 HttpOnly 쿠키가 안전
    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true, //자바스크립트 접근 불가(XSS 방지)
      maxAge: 60 * 60, //1시간
      path: '/',
    });
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });
    console.log('AccessToken from Cookie', cookieStore.get('accessToken')?.value);

    return {
      success: true,
      data: {
        nickname: data.nickname,
        role: data.role,
        email,
      },
    };
  } catch (error) {
    // 백엔드 에러 코드 기반으로 매핑
    if (isBackendError(error)) {
      return mapAuthError(error);
    }

    // 예상치 못한 에러
    return {
      success: false,
      message: '알 수 없는 에러가 발생했습니다.',
    };
  }
};
