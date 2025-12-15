"use server";

import { cookies } from "next/headers";
import { refreshToken } from "@/services/auth.service";

import { handleResponse } from "./api";
import { ApiResponse } from "../types/types";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/v1";

export const fetchWithAuth = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}),
  };

  let res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  // 401 에러면 토큰 갱신 후 재시도
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      // 갱신 성공 - 새 토큰으로 재시도
      const cookieStore = await cookies();
      const newAccessToken = cookieStore.get("accessToken")?.value;

      const retryHeaders = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...((newAccessToken && { Authorization: `Bearer ${newAccessToken}` }) ||
          {}),
      };

      res = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: retryHeaders,
      });
    }
  }

  return handleResponse<T>(res);
};

// 토큰 갱신 함수
async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("refreshToken")?.value;

  if (!refreshTokenValue) return false;

  try {
    const { accessToken } = await refreshToken({
      refreshToken: refreshTokenValue,
    });

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    });

    return true;
  } catch {
    return false;
  }
}
