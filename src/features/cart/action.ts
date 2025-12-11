"use server";

import { deleteAllCart, deleteCartItem } from "@/services/cart.service";
import { revalidatePath } from "next/cache";

export const deleteCartItemAction = async (courseId: number) => {
  await deleteCartItem(courseId);
  revalidatePath("/cart");
};

export const deleteCartAllAction = async () => {
  await deleteAllCart();
  revalidatePath("/cart");
};
