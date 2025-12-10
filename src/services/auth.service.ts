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
  const data = await post(`${REGISTER_ENDPOIINT}`, body);
  return data as RegistResponse;
};

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  const data = await post(`${LOGIN_ENDPOINT}`, body);
  return data as LoginResponse;
};

export const refreshToken = async (
  body: RefreshRequest
): Promise<RefreshResponse> => {
  const data = await post(`${REFRESH_ENDPOINT}`, body);
  return data as RefreshResponse;
};
