import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./shared/utils/jwt";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("현재 경로:", pathname);
  console.log("토큰 존재:", !!accessToken);

  // 인증 체크
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    // 로그인 후 돌아올 경로 저장
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 역할 체크
  if (pathname.startsWith("/instructor")) {
    const user = decodeJWT(accessToken);

    if (!user || user.role !== "INSTRUCTOR") {
      // INSTRUCTOR가 아니면 홈으로
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 모든 검증 통과 시
  return NextResponse.next();
}

export const config = {
  // 아래 경로들에만 proxy가 실행되는 것
  matcher: ["/instructor/:path*", "/mypage/:path*", "/cart"],
};
