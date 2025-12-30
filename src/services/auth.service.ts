import {
  RegistRequest,
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

/**
 * 회원가입
 * @throws {BackendError} 백엔드 에러 발생 시
 */
export const registerUser = async (
  body: RegistRequest
): Promise<RegistResponse> => {
  return await post<RegistResponse>(REGISTER_ENDPOINT, body);
};

/**
 * 로그인
 * @throws {BackendError} 백엔드 에러 발생 시
 */
export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  return await post<LoginResponse>(LOGIN_ENDPOINT, body);
};

/**
 * 토큰 갱신
 * @throws {BackendError} 백엔드 에러 발생 시
 */
export const refreshToken = async (
  body: RefreshRequest
): Promise<RefreshResponse> => {
  return await post<RefreshResponse>(REFRESH_ENDPOINT, body);
};
