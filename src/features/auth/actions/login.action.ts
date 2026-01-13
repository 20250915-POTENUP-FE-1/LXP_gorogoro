'use server';

import { cookies } from 'next/headers';
import { validateLoginForm } from '../validate';
import type { LoginRequest, LoginUserInfo } from '../types';
import { ACCESS_TOKEN } from '@/shared/constants/token';

type ActionState<T> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};
type CookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  sameSite?: 'lax' | 'strict' | 'none';
  secure?: boolean;
  httpOnly?: boolean;
};

function parseSetCookie(setCookie: string) {
  const parts = setCookie.split(';').map((p) => p.trim());
  const [nameValue, ...attrs] = parts;

  const eqIdx = nameValue.indexOf('=');
  if (eqIdx < 0) return null;

  const name = nameValue.slice(0, eqIdx);
  const value = nameValue.slice(eqIdx + 1);

  const options: CookieOptions = {};

  for (const a of attrs) {
    const [rawK, ...rawV] = a.split('=');
    const k = rawK.toLowerCase();
    const v = rawV.join('=');

    if (k === 'path') options.path = v || '/';
    else if (k === 'domain') options.domain = v;
    else if (k === 'max-age') options.maxAge = Number(v);
    else if (k === 'expires') {
      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) options.expires = d;
    } else if (k === 'samesite') {
      const s = v.toLowerCase();
      if (s === 'lax' || s === 'strict' || s === 'none') options.sameSite = s;
    } else if (k === 'secure') options.secure = true;
    else if (k === 'httponly') options.httpOnly = true;
  }
  return { name, value, options };
}

export const loginAction = async (
  prevState: ActionState<LoginUserInfo>,
  formData: FormData,
): Promise<ActionState<LoginUserInfo>> => {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const validation = validateLoginForm({ email, password });
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const payload: LoginRequest = { email, password };

  const res = await fetch(`${process.env.API_BASE_URL}auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.json();
    return { success: false, message: msg.message || `로그인 실패 (HTTP ${res.status})` };
  }

  const data = await res.json();
  const cookieStore = await cookies();

  // 1) 자바 서버가 내려준 refresh_token(Set-Cookie)을 브라우저 응답 쿠키로 "재설정"
  const upstreamSetCookies = res.headers.getSetCookie?.() ?? [];
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
    data: {
      nickname: data.nickname,
      role: data.role,
      email,
    },
  };
};
