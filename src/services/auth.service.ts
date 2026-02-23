import {
  RegistRequest,
  RegistResponse,
  LoginRequest,
  ReissueResponse,
} from '@/features/auth/types';
import { fetchWithAuth } from '@/shared/lib/authApi';
import parseSetCookie from '@/shared/utils/parseSetCookie';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/shared/constants/token';

const BASE_URL = process.env.API_BASE_URL;
const SIGNUP_ENDPOINT = 'users/register';
const LOGIN_ENDPOINT = 'auth/login';
const REFRESH_ENDPOINT = 'auth/reissue';

/**
 * 회원가입
 * POST /api/auth/register
 */
export const registerUser = async (body: RegistRequest): Promise<RegistResponse> => {
  return await fetchWithAuth<RegistResponse>(SIGNUP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * 로그인
 * POST /api/auth/login
 */
export const loginUser = async (body: LoginRequest) => {
  const res = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  if (!res.ok) {
    const data = await res.json();
    return {
      success: false,
      message: data.message || `로그인 실패 (HTTP ${res.status}`,
    };
  }
  const data = await res.json();
  const cookieStore = await cookies();

  // 자바 서버가 내려준 refresh_token(Set-Cookie)을 브라우저 응답 쿠키로 "재설정"
  const upstreamSetCookies = res.headers.getSetCookie() ?? [];
  for (const sc of upstreamSetCookies) {
    const parsed = parseSetCookie(sc);
    cookieStore.set(parsed.name, parsed.value, {
      ...parsed.options,
      path: parsed.options.path ?? '/',
    });
  }

  cookieStore.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 600,
  });

  return {
    success: true,
    message: data.message || `로그인 성공`,
    data: {
      userId: data.userId,
      name: data.name,
      email: data.email,
      accessToken: data.accessToken,
    },
  };
};

/**
 * 재발급
 * POST /api/auth/reissue
 */
export const reissueUser = async (body): Promise<ReissueResponse> => {
  return await fetchWithAuth<ReissueResponse>(REFRESH_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
