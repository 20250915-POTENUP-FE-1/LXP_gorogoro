import {
  RegitstRequest,
  RegistResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/features/auth/types";
import { post } from "@/shared/lib/api";
const REGISTER_ENDPOINT = "auth/register";
const LOGIN_ENDPOINT = "auth/login";
const REFRESH_ENDPOINT = "auth/refresh";

export const registerUser = async (
  body: RegitstRequest
): Promise<RegistResponse> => {
  const response = await post<RegistResponse>(`${REGISTER_ENDPOINT}`, body);
  // response = {data: RegistResponse | null, error: BackendError | null}
  if (response.error) throw response.error; // BackendError
  if (!response.data) throw new Error("응답 데이터가 없습니다.");
  return response.data;
};

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>(`${LOGIN_ENDPOINT}`, body);
  // response = {data: LoginResponse | null, error: BackendError | null}
  if (response.error) throw response.error; // BackendError
  if (!response.data) throw new Error("응답 데이터가 없습니다.");
  return response.data;
};

export const refreshToken = async (
  body: RefreshRequest
): Promise<RefreshResponse> => {
  const response = await post<RefreshResponse>(`${REFRESH_ENDPOINT}`, body);
  if (response.error) throw response.error;
  if (!response.data) throw new Error("응답 데이터가 없습니다.");
  return response.data;
};
