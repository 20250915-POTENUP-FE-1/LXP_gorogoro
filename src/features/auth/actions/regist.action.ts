"use server";

import { regitsterUser } from "@/services/auth.service";
import { RegitstRequest, ROLE } from "../types";
import { validateRegistForm } from "../validate";

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
    await regitsterUser(payload);
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
