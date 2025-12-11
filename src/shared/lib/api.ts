import { cookies } from "next/headers";

const BASE_URL = "http://localhost:3002/api/v1";

export const get = async (endpoint: string, apiParams?: any) => {
  let url = `${BASE_URL}/${endpoint}`;

  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?${queryString}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET FAILED: ${res.status}`);
  return res.json();
};

export const post = async (endpoint: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST FAILED: ${res.status}`);
  return res.json();
};

export const patch = async (endpoint: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT FAILED: ${res.status}`);
  return res.json();
};

export const del = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`DELETE FAILED: ${res.status}`);
  return res.json();
};

export const fetchWithAuth = async (
  edpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = {
    "Content-Type": "application/json", //기본 헤더
    ...(options.headers || {}), //호출하는 쪽에서 넣어준 헤더
    ...((accessToken && { Authorization: `Bearer ${accessToken}` }) || {}), //토큰 있으면 Authorization 추가
  };

  const res = await fetch(`${BASE_URL}/${edpoint}`, {
    ...options,
    headers,
  });
  return res;
};
