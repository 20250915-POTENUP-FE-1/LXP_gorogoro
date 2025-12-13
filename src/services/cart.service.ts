import { fetchWithAuth } from "@/shared/lib/serverApi";

const CARTS_ENDPOINT = "carts";

export const getCart = async () => {
  const response = await fetchWithAuth(CARTS_ENDPOINT, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 등록
export const addToCart = async (courseId: string) => {
  const response = await fetchWithAuth(CARTS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 전체 삭제
export const deleteAllCart = async () => {
  const response = await fetchWithAuth(CARTS_ENDPOINT, {
    method: "DELETE",
  });
  if (response.error) throw response.error;
  return response.data;
};

//장바구니 선택 삭제
export const deleteCartItem = async (courseId: number) => {
  const response = await fetchWithAuth(`${CARTS_ENDPOINT}/items`, {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
  });
  if (response.error) throw response.error;
  return response.data;
};
