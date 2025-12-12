"use server";

import { loginUser } from "@/services/auth.service";
import { LoginRequest, LoginUserInfo } from "../types";
import { cookies } from "next/headers";
import { validateLoginForm } from "../validate";

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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknow Error",
    };
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

  // 토큰 제외하고 사용자 정보만 반환
  return {
    success: true,
    data: {
      nickName: data.nickName,
      role: data.role,
    },
  };
  //redirect("/courses")
};
