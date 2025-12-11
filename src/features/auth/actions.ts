"use server";
import { loginUser, regitsterUser } from "@/services/auth.service";
import { LoginRequest, LoginUserInfo, RegitstRequest, ROLE } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState<T> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: T;
};

export const registAction = async (
  prevState: ActionState<void>,
  formData: FormData
): Promise<ActionState<void>> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = formData.get("role") as ROLE;
  //유효성 검사 => 각 form 에 맞는 error <key,value> 형태 반환
  const errors: Record<string, string> = {};
  const nameRegex = /^[가-힣]{2,7}$/; // 완성형 한글 2~7자
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/; // 영문 + 숫자 + 특수문자 포함, 8자 이상
  const emailRegex =
    /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // 기본 이메일 형식 + .. 금지
  if (!name) {
    errors.name = "이름을 입력해주세요.";
  } else if (!nameRegex.test(name)) {
    errors.name = "이름은 2~7자의 완성된 한글만 입력할 수 있습니다.";
  }
  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  // 유효성 검사 에러가 하나라도 있으면 API 호출 전에 반환
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors,
    };
  }
  const newUser: RegitstRequest = {
    name,
    email,
    password,
    role,
  };
  let data;
  try {
    data = await regitsterUser(newUser);
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown Error 발생",
    };
  }
  return {
    success: true,
    message: "회원가입이 성공적으로 완료되었습니다.",
  };
};
export const loginAction = async (
  prevState: ActionState<LoginUserInfo>,
  formData: FormData
): Promise<ActionState<LoginUserInfo>> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  //유효성검사 ->에러처리
  const errors: Record<string, string> = {};
  if (!email) {
    errors.email = "이메일을 입력하세요";
  }
  if (!password) {
    errors.password = "비밀번호를 입력하세요";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors,
    };
  }
  const loginBody: LoginRequest = {
    email,
    password,
  };
  let data;
  try {
    data = await loginUser(loginBody);
  } catch (error) {
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

  // ✅ 토큰은 제외하고 사용자 정보만 반환
  return {
    success: true,
    data: {
      nickName: data.nickName,
      role: data.role,
    },
  };

  // redirect("/courses");
};
