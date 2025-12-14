"use server";

import { deleteAllCart, deleteCartItem } from "@/services/cart.service";
import { BackendError } from "@/shared/types/types";
import { handleBackendError } from "@/shared/utils/errorHandler";
import { revalidatePath } from "next/cache";

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
export const deleteCartItemAction = async (
  courseId: number
): Promise<ActionState> => {
  try {
    await deleteCartItem(courseId);
    revalidatePath("/cart");
    return {
      success: true,
      message: "장바구니에서 삭제되었습니다.",
    };
  } catch (error) {
    const err = error as BackendError;
    return handleBackendError(err);
  }
};

export const deleteCartAllAction = async () => {
  try {
    await deleteAllCart();
    revalidatePath("/cart");
    return {
      success: true,
      message: "장바구니에서 모두 삭제되었습니다.",
    };
  } catch (error) {
    const err = error as BackendError;
    return handleBackendError(err);
  }
};
