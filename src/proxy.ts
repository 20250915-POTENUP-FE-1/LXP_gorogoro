import { NextRequest, NextResponse } from 'next/server';

function isAuthPage(pathname: string) {
  return pathname === '/login' || pathname === '/signup' || pathname.startsWith('/auth');
}

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 정적 파일은 미들웨어 대상에서 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (isAuthPage(pathname)) {
    if (refreshToken) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  if (!refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callback', `${pathname}${search ?? ''}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next).*)'],
};
