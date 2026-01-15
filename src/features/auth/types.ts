export type ROLE = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  uid?: string;
  email: string;
  password: string;
  name: string;
  role: ROLE;
  createdAt?: string;
}

export interface RegistRequest {
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

export interface RegistResponse {
  message: string;
}

export type RegistFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: ROLE;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  role: ROLE;
}

// 클라이언트로 반환되는 사용자 정보 (토큰 제외)
export interface LoginUserInfo {
  nickname: string;
  role: ROLE;
  email?: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface GetMeResponse {
  id: number;
  name: string;
  nickname: string;
  email: string;
  role: ROLE;
  createdAt: string;
}

export interface ModifyMeRequest {
  email?: string;
  passwordEncrypted?: string;
  name?: string;
  nickname?: string;
}
