export type BackendError = {
  status: number;
  code?: string;
  message?: string;
  errors?: {};
};

/**
 * 에러가 BackendError 타입인지 확인하는 타입 가드
 */
export function isBackendError(error: unknown): error is BackendError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as any).status === "number"
  );
}

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
