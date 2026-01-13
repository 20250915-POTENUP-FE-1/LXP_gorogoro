const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/api/';

/**
 * HTTP Response를 처리하고 에러 시 throw
 * @throws {BackendError} HTTP 에러 발생 시
 */
type ApiError = {
  status: number;
  code?: string;
  message?: string;
  errors?: unknown;
};

const handleResponse = async <T>(res: Response): Promise<T | null> => {
  const text = await res.text();
  const contentType = res.headers.get('content-type') ?? '';

  // 에러 응답 처리
  if (!res.ok) {
    let errorBody: any = null;
    if (text && contentType.includes('application/json')) {
      try {
        errorBody = JSON.parse(text);
      } catch {
        //백엔드 에러가 JSON 아닐 경우 프론트에서 JSON.parse가 실패로 터지지 않게 하기 위해
        errorBody = null;
      }
    }

    const error: ApiError = {
      status: res.status,
      code: errorBody?.code,
      message: errorBody?.message || res.statusText || '알 수 없는 에러가 발생했습니다',
      errors: errorBody?.errors,
    };
    throw error;
  }

  // 204 or empty body
  if (!text) return null;

  // 성공인데 JSON이 아니면 버그로 판단
  if (!contentType.includes('application/json')) {
    throw {
      status: res.status,
      message: `JSON 응답을 기대했지만 content-type이 ${contentType} 입니다.`,
    };
  }

  return JSON.parse(text) as T;
};

/**
 * GET 요청
 * @throws {BackendError}
 */
type ApiParamValue = string | number | boolean;
type ApiParams = Record<string, ApiParamValue | null | undefined>;
export const get = async <T>(endpoint: string, apiParams?: ApiParams): Promise<T> => {
  let url = `${BASE_URL}${endpoint}`;

  if (apiParams) {
    const params = new URLSearchParams();

    Object.entries(apiParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      params.set(key, String(value));
    });

    const qs = params.toString();
    if (qs) url = `${url}?${qs}`;
  }
  console.log('fetch url:', url);

  const res = await fetch(url);
  return handleResponse<T>(res);
};

/**
 * POST 요청
 * @throws {BackendError}
 */
export const post = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
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
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
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
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  return handleResponse<T>(res);
};
