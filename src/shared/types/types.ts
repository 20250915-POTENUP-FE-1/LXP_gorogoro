export type ApiResponse<T> = {
  data: T | null;
  error: BackendError | null;
};

export type BackendError = {
  status: number;
  code?: string;
  message?: string;
  errors?: {};
};
