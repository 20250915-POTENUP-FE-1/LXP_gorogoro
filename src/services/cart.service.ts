import { Cart } from "@/features/cart/types";
import { fetchWithAuth } from "@/shared/lib/serverApi";

const CARTS_ENDPOINT = "carts";

export const getCart = async () => {
  const data = await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: "GET",
  });
  if (!data.ok) throw new Error(`장바구니 정보 가져오기 실패:${data.status}`);
  return data.json();
};
//장바구니 등록
export const addToCart = async (courseId: number) => {
  const data = await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });
  if (!data.ok) throw new Error(`장바구니 등록 실패:${data.status}`);
  return data.json();
};
//장바구니 전체 삭제
export const deleteAllCart = async () => {
  const data = await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: "DELETE",
  });
  if (!data.ok) throw new Error(`장바구니 전체 삭제 실패:${data.status}`);
  return data.json();
};
//장바구니 선택 삭제
export const deleteCartItem = async (courseId: number) => {
  const data = await fetchWithAuth(`${CARTS_ENDPOINT}/items`, {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
  });
  if (!data.ok) throw new Error(`장바구니 선택 삭제 실패:${data.status}`);
  return data.json();
};
