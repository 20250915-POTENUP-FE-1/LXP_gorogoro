export type ROLE = "STUDENT" | "INSTRUCTOR";

export interface User {
  id: string;
  uid?: string;
  email: string;
  password: string;
  name: string;
  role: ROLE;
  createdAt?: string;
}
export interface RegitstRequest {
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
  nickName: string;
  role: ROLE;
}

// 클라이언트로 반환되는 사용자 정보 (토큰 제외)
export interface LoginUserInfo {
  nickName: string;
  role: ROLE;
}

export interface RefreshRequest {
  refreshToken: string;
}
export interface RefreshResponse {
  accessToken: string;
}
export interface GetMeResponse {
  accessToken: string;
  name: string;
  role: string;
}
export interface ModifyMeRequest {
  email?: string;
  password?: string;
  name?: string;
  nickName?: string;
}
export interface ModifyMeResponse {
  user: User;
}
