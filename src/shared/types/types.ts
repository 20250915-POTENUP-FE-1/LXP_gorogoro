export type BackendError = {
  status: number;
  code?: string;
  message?: string;
  errors?: unknown;
};

/**
 * 에러가 BackendError 타입인지 확인하는 타입 가드
 */
export const isBackendError = (error: unknown): error is BackendError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error && // code 필드가 있는지 확인
    'status' in error && // status 필드가 있는지 확인
    'message' in error // message 필드가 있는지 확인
  );
};
