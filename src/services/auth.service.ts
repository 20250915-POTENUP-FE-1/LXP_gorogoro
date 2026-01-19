import {
  RegistRequest,
  RegistResponse,
  LoginRequest,
  LoginResponse,
  ReissueResponse,
} from '@/features/auth/types';
import { fetchWithAuth } from '@/shared/lib/authApi';

const SIGNUP_ENDPOINT = 'users/register';
const LOGIN_ENDPOINT = 'auth/login';
const REFRESH_ENDPOINT = 'auth/reissue';

/**
 * 회원가입
 * POST /api/auth/register
 */
export const registerUser = async (body: RegistRequest): Promise<RegistResponse> => {
  return await fetchWithAuth<RegistResponse>(SIGNUP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * 로그인
 * POST /api/auth/login
 */
export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  return await fetchWithAuth<LoginResponse>(LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * 재발급
 * POST /api/auth/reissue
 */
export const reissueUser = async (body): Promise<ReissueResponse> => {
  return await fetchWithAuth<ReissueResponse>(REFRESH_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
