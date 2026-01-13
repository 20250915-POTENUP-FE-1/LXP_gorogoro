import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constants/token';

type AccessTokenResponse = { accessToken: string; refreshToken: string }; // 백엔드 스펙에 맞게 수정
type RefreshTokenCommand = { refreshToken: string };

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
  const callback = request.nextUrl.searchParams.get('callback') ?? '/';
  if (!refreshToken) {
    return NextResponse.redirect(
      new URL(`/login?callback=${encodeURIComponent(callback)}`, request.url),
    );
  }

  const upstream = await fetch(`${process.env.API_BASE_URL}auth/reissue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refresh_token=${refreshToken}`,
    },
    body: JSON.stringify({ refreshToken } satisfies RefreshTokenCommand),
    cache: 'no-store',
  });

  if (!upstream.ok) {
    return NextResponse.redirect(
      new URL(`/login?callback=${encodeURIComponent(callback)}`, request.url),
    );
  }

  const data = (await upstream.json()) as AccessTokenResponse;

  const res = NextResponse.redirect(new URL(callback, request.url));
  res.cookies.set(ACCESS_TOKEN, data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 600,
  });

  return res;
}
