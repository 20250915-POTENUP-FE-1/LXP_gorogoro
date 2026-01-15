import { cookies } from 'next/headers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/token';

export async function withRefreshRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (getStatus(error) !== 401) throw error;

    // 401이면 재발급
    await reissueAccessToken();

    // 그리고 원래 요청 딱 1번 재시도
    return await fn();
  }
}
function getStatus(error: unknown): number | undefined {
  return typeof error === 'object' && error !== null && 'status' in error
    ? Number(error.status)
    : undefined;
}

async function reissueAccessToken(): Promise<void> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    const e = new Error('NO_REFRESH_TOKEN') as HttpError;
    e.status = 401;
    throw e;
  }

  const res = await fetch(`${process.env.API_BASE_URL}auth/reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refresh_token=${refreshToken}`,
    },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const e = new Error('REISSUE_FAILED') as HttpError;
    e.status = res.status;
    throw e;
  }

  const data = await res.json();

  cookieStore.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
}
