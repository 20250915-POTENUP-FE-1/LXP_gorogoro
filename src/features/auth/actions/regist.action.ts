"use server";

import { registerUser } from "@/services/auth.service";
import { RegitstRequest, ROLE } from "../types";
import { validateRegistForm } from "../validate";
import { isBackendError } from "@/shared/types/types";
import { mapAuthError } from "../utils/authErrorMapper";

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

  const validation = validateRegistForm({
    name,
    email,
    password,
    confirmPassword,
  });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const payload: RegitstRequest = {
    name,
    email,
    password,
    role,
  };

  try {
    await registerUser(payload);

    return {
      success: true,
      message: "회원가입이 성공적으로 완료되었습니다.",
    };
  } catch (error) {
    // 백엔드 에러 코드 기반으로 매핑
    if (isBackendError(error)) {
      return mapAuthError(error);
    }

    // 예상치 못한 에러
    return {
      success: false,
      message: "알 수 없는 에러가 발생했습니다.",
    };
  }
};
