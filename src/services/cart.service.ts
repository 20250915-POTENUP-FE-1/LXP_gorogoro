import { get, post, del } from "@/shared/lib/api";

const CARTS_ENDPOINT = "carts";

export const getCart = async () => {
  const response = await get(CARTS_ENDPOINT);
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 등록
export const addToCart = async (courseId: string) => {
  const response = await post(CARTS_ENDPOINT, { courseId });
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 전체 삭제
export const deleteAllCart = async () => {
  const response = await del(CARTS_ENDPOINT);
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 선택 삭제
export const deleteCartItem = async (courseId: number) => {
  const response = await del(`${CARTS_ENDPOINT}/items`, { courseId });
  if (response.error) throw response.error;
  return response.data;
};
