'use server';

import { cookies } from 'next/headers';
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/api/';

type ApiError = {
  status: number;
  code?: string;
  message?: string;
  errors?: unknown;
};

/**
 * HTTP Response를 처리하고 에러 시 throw
 * @throws {BackendError} HTTP 에러 발생 시
 */
const handleResponse = async <T>(res: Response): Promise<T | null> => {
  const text = await res.text();
  const contentType = res.headers.get('content-type') ?? '';

  // 에러 응답 처리
  if (!res.ok) {
    let errorBody = null;
    if (text && contentType.includes('application/json')) {
      try {
        errorBody = JSON.parse(text);
      } catch {
        //백엔드 에러가 JSON 아닐 경우 프론트에서 JSON.parse가 실패로 터지지 않게 하기 위해
        errorBody = null;
      }
    }

    const error: ApiError = {
      status: res.status,
      code: errorBody?.code,
      message: errorBody?.message || res.statusText || '알 수 없는 에러가 발생했습니다',
      errors: errorBody?.errors,
    };
    throw error;
  }

  // 204 or empty body
  if (!text) return null;

  // 성공인데 JSON이 아니면 버그로 판단
  if (!contentType.includes('application/json')) {
    throw {
      status: res.status,
      message: `JSON 응답을 기대했지만 content-type이 ${contentType} 입니다.`,
    };
  }
  return JSON.parse(text) as T;
};

/**
 * 인증이 필요한 API 요청 (자동 토큰 갱신 포함)
 * @throws {BackendError}
 */
export const fetchWithAuth = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  return handleResponse<T>(res);
};
