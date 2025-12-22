"use server";

import { cookies } from "next/headers";
import { refreshToken } from "@/services/auth.service";
import { BackendError } from "../types/types";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/";

/**
 * HTTP Response를 처리하고 에러 시 throw
 * @throws {BackendError} HTTP 에러 발생 시
 */
const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    let errorBody: any = null;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: "알 수 없는 에러가 발생했습니다" };
    }

    const backendError: BackendError = {
      status: res.status,
      code: errorBody?.code,
      message: errorBody?.message || res.statusText,
      errors: errorBody?.errors,
    };

    throw backendError;
  }

  if (res.status === 204) {
    return null as T;
  }

  return await res.json();
};

/**
 * 인증이 필요한 API 요청 (자동 토큰 갱신 포함)
 * @throws {BackendError}
 */
export const fetchWithAuth = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}),
  };

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  // 401 에러면 토큰 갱신 후 재시도
  if (res.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
        },
        cache: "no-store",
      });
    }
  }

  return handleResponse<T>(res);
};

// 토큰 갱신 함수 -> 반환값 : accessToken(string) or null
const refreshAccessToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("refreshToken")?.value;
  if (!refreshTokenValue) return null;

  try {
    const result = await refreshToken({
      refreshToken: refreshTokenValue,
    });
    console.log("[refresh] success result: ", result);
    const { accessToken } = result;
    console.log("[refresh] accessToken exists?", !!accessToken);

    if (!accessToken) return null;
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });
    console.log("[refresh] accessToken cookie set");
    return accessToken;
  } catch (error) {
    console.log("refresh failed:", error);
    return null;
  }
};
