import {
  RegistRequest,
  RegistResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from '@/features/auth/types';
import { fetchWithAuth } from '@/shared/lib/authApi';

const SIGNUP_ENDPOINT = 'users/register';
const LOGIN_ENDPOINT = 'auth/login';
const REFRESH_ENDPOINT = 'auth/reissue';

export const registerUser = async (body: RegistRequest): Promise<RegistResponse> => {
  return await fetchWithAuth<RegistResponse>(SIGNUP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
  return await fetchWithAuth<LoginResponse>(LOGIN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const refreshToken = async (body: RefreshRequest): Promise<RefreshResponse> => {
  return await fetchWithAuth<RefreshResponse>(REFRESH_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
