"use server";

import { cookies } from "next/headers";
const BASE_URL = process.env.API_BASE_URL || "http://localhost:3002/api/v1";

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = {
    "Content-Type": "application/json", //기본 헤더
    ...(options.headers || {}), //호출하는 쪽에서 넣어준 헤더
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}), //토큰 있으면 Authorization 추가
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });
  return res;
};
