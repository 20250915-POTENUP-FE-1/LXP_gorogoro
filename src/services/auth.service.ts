import {
  RegitstRequest,
  RegistResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/features/auth/types";
import { post } from "@/shared/lib/api";
const REGISTER_ENDPOIINT = "auth/register";
const LOGIN_ENDPOINT = "auth/login";
const REFRESH_ENDPOINT = "auth/refresh";

export const regitsterUser = async (
  body: RegitstRequest
): Promise<RegistResponse> => {
  const response = await post<RegistResponse>(`${REGISTER_ENDPOIINT}`, body);
  if (response.error) throw response.error;
  return response.data!;
};

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginResponse>(`${LOGIN_ENDPOINT}`, body);
  if (response.error) throw response.error; // BackendError
  return response.data!;
};

export const refreshToken = async (
  body: RefreshRequest
): Promise<RefreshResponse> => {
  const response = await post<RefreshResponse>(`${REFRESH_ENDPOINT}`, body);
  if (response.error) throw response.error;
  return response.data!;
};
