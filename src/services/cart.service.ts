import { del, get, post } from "@/shared/lib/api";

const CARTS_ENDPOINT = "carts";

export const getCart = async () => {
  const data = await get(`${CARTS_ENDPOINT}`);
  return data;
};
//장바구니 등록
export const addToCart = async (courseId: number) => {
  const data = await post(`${CARTS_ENDPOINT}`, { courseId });
  return data;
};
//장바구니 전체 삭제
export const deleteAllCart = async () => {
  const data = await del(`${CARTS_ENDPOINT}`);
  return data;
};
//장바구니 선택 삭제
export const deleteCartItem = async (courseId: number) => {
  const data = await del(`${CARTS_ENDPOINT}/items`, { courseId });
  return data;
};
