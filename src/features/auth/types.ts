export type ROLE = 'USER' | 'INSTRUCTOR' | 'ADMIN' | 'STUDENT';

export interface RegistRequest {
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

export interface RegistResponse {
  userId: number;
  email: string;
  name: string;
  role: ROLE;
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
  userId: number;
  name: string;
  email: string;
  accessToken: string;
}

export interface ReissueResponse {
  accessToken: string;
}

export interface GetMeResponse {
  userId: number;
  email: string;
  name: string;
  role: ROLE;
}

export interface UpdateUserRequest {
  name: string;
  newPassword: string;
  newPasswordCheck: string;
}

export interface UpdateUserResponse {
  userId: number;
  email: string;
  name: string;
  role: ROLE;
}
