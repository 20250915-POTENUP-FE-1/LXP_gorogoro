"use server";

import { loginUser } from "@/services/auth.service";
import { LoginRequest, LoginUserInfo } from "../types";
import { cookies } from "next/headers";
import { validateLoginForm } from "../validate";
import { BackendError } from "../types";

type ActionState<T> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};
export const loginAction = async (
  prevState: ActionState<LoginUserInfo>,
  formData: FormData
): Promise<ActionState<LoginUserInfo>> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = validateLoginForm({ email, password });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }
  const payload: LoginRequest = {
    email,
    password,
  };

  let data;
  try {
    data = await loginUser(payload);
  } catch (error) {
    //백엔드 에러 코드 기반으로 매핑 필요
    const err = error as BackendError;
    switch (err.code) {
      case "CRS-001":
        return {
          success: false,
          message: err.message ?? "입력값이 올바르지 않습니다.",
          errors: { email: "입력값이 올바르지 않습니다." },
        };
      case "CRS-002":
        return {
          success: false,
          message: err.message ?? "입력값이 올바르지 않습니다.",
          errors: { email: "유효하지 않은 이메일입니다." },
        };
      default:
        return {
          success: false,
          message: err.message ?? "로그인 실패",
        };
    }
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true, //자바스크립트 접근 불가(XSS 방지)
    maxAge: 60 * 60, //1시간
    path: "/",
  });
  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: "/",
  });

  return {
    success: true,
    data: {
      nickName: data.nickName,
      role: data.role,
    },
  };
};
