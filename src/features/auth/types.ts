export type ROLE = "STUDENT" | "INSTRUCTOR" | "ADMIN";

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
  role: string;
}

export interface RegistResponse {
  message: string;
}

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
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface GetMeResponse {
  id: number;
  username: string;
  nickname: string;
  email: string;
  role: ROLE;
  createdAt: string;
}

export interface ModifyMeRequest {
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
}

export interface ModifyMeResponse {
  user: User;
}
