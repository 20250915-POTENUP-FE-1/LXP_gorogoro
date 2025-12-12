"use server";

import { cookies } from "next/headers";
import { handleResponse } from "./api";
import { ApiResponse } from "../types/types";
const BASE_URL = process.env.API_BASE_URL || "http://localhost:3002/api/v1";

export const fetchWithAuth = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("=== fetchWithAuth ===");
  console.log("Endpoint:", endpoint);
  console.log("AccessToken:", accessToken ? "존재" : "없음");

  const headers = {
    "Content-Type": "application/json", //기본 헤더
    ...(options.headers || {}), //호출하는 쪽에서 넣어준 헤더
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}), //토큰 있으면 Authorization 추가
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(res);
};
