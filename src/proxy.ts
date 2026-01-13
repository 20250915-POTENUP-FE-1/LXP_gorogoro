import { NextResponse, NextRequest } from 'next/server';
import { REFRESH_TOKEN } from '@/shared/constants/token';

const AUTH_PAGES = ['/login', '/signup'];
const PROTECTED_PREFIXES = ['/mypage', '/cart'];
function isAuthPage(pathname: string) {
  return AUTH_PAGES.some((p) => pathname.startsWith(p));
}

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set('x-pathname', pathname);
  reqHeaders.set('x-search', search);

  // 보호 라우트인데 토큰 없음 → login + callback
  if (!refreshToken && isProtected(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callback', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // (선택) 로그인 상태에서 login/signup 접근 → 홈으로
  if (refreshToken && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next({
    request: { headers: reqHeaders },
  });
}

export const config = {
  matcher: [
    // api, next 내부 리소스, 정적 파일 제외
    '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$).*)',
  ],
};
