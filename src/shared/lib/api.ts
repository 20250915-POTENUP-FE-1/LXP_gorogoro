const BASE_URL = process.env.API_BASE_URL || "http://localhost:8082/api/";

/**
 * HTTP Response를 처리하고 에러 시 throw
 * @throws {BackendError} HTTP 에러 발생 시
 */
const handleResponse = async <T>(res: Response): Promise<T> => {
  // 에러 응답 처리
  if (!res.ok) {
    let errorBody = null;

    try {
      errorBody = await res.json();
    } catch {
      // JSON 파싱 실패 - 백엔드에서 정의하지 못한 에러
      errorBody = { message: "알 수 없는 에러가 발생했습니다" };
    }

    throw {
      status: res.status,
      code: errorBody?.code,
      message: errorBody?.message || res.statusText,
      errors: errorBody?.errors,
    };
  }

  // 204 No Content
  if (res.status === 204) {
    return null as T;
  }

  // 성공(200): 응답 바디 비어있음 ""
  const text = await res.text();
  if (!text) return null as T;
  return JSON.parse(text) as T;
};

/**
 * GET 요청
 * @throws {BackendError}
 */
export const get = async <T>(endpoint: string, apiParams?: any): Promise<T> => {
  let url = `${BASE_URL}${endpoint}`;

  if (apiParams && Object.keys(apiParams).length > 0) {
    const queryString = new URLSearchParams(apiParams).toString();
    url = `${url}?${queryString}`;
  }
  console.log("fetch url:", url);
  const res = await fetch(url);
  return handleResponse<T>(res);
};

/**
 * POST 요청
 * @throws {BackendError}
 */
export const post = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

/**
 * PUT 요청
 * @throws {BackendError}
 */
export const put = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

/**
 * PATCH 요청
 * @throws {BackendError}
 */
export const patch = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
};

/**
 * DELETE 요청
 * @throws {BackendError}
 */
export const del = async <T>(endpoint: string, body?: unknown): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  return handleResponse<T>(res);
};
