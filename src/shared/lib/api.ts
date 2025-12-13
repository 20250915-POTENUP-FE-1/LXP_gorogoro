import { ApiResponse } from "../types/types";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/v1";

// 응답 처리 유틸 함수
export const handleResponse = async <T = any>(
  res: Response
): Promise<ApiResponse<T>> => {
  if (!res.ok) {
    let errorBody = null;
    try {
      errorBody = await res.json();
    } catch {
      // JSON 파싱 실패 - 백엔드에서 정의하지 못한 에러
      errorBody = { message: "알 수 없는 에러가 발생했습니다" };
    }
    return {
      data: null,
      error: {
        status: res.status,
        errors: errorBody.errors,
        code: errorBody?.code,
        message: errorBody?.message || res.statusText,
      },
    };
  }

  return { data: await res.json(), error: null };
};

export const get = async <T = any>(
  endpoint: string,
  apiParams?: any
): Promise<ApiResponse<T>> => {
  let url = `${BASE_URL}/${endpoint}`;

  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?${queryString}`;
  }

  const res = await fetch(url);
  return handleResponse<T>(res);
};

export const post = async <T = any>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

export const put = async <T = any>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

export const patch = async <T = any>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

export const del = async <T = any>(
  endpoint: string,
  body?: unknown
): Promise<ApiResponse<T>> => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  return handleResponse<T>(res);
};
