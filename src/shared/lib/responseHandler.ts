import { ApiResponse } from "../types/types";
import { BackendError } from "../types/types";

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
    const backendError: BackendError = {
      status: res.status,
      code: errorBody?.code,
      message: errorBody?.message || res.statusText,
      errors: errorBody?.errors,
    };
    return {
      data: null,
      error: backendError,
    };
  }

  if (res.status === 204) {
    return { data: null, error: null };
  }
  return { data: (await res.json()) as T, error: null };
};
