import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./shared/utils/jwt";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const url = request.nextUrl;

  // 인증 체크
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callback", url.pathname); // 로그인 후 복귀할 경로
    return NextResponse.redirect(loginUrl);
  }

  // 역할 체크
  if (url.pathname.startsWith("/instructor")) {
    const user = decodeJWT(accessToken);

    if (!user || user.role !== "INSTRUCTOR") {
      const homeUrl = new URL("/",request.url); // INSTRUCTOR가 아니면 홈으로
      return NextResponse.redirect(homeUrl);
    }
  }

  // 모든 검증 통과 시
  return NextResponse.next();
}

// 인증이 필요한 경로에서만 proxy 실행
export const config = {
  matcher: [
    "/instructor/:path*", // 강사 전용 페이지
    "/mypage/:path*", // 마이페이지
    "/cart", // 장바구니
  ],
};
