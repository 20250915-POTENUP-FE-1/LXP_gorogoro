import { fetchWithAuth } from "@/shared/lib/authApi";

const CARTS_ENDPOINT = "carts";

/**
 * 장바구니 조회
 * @throws {BackendError}
 */
export const getCart = async () => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: "GET",
  });
};

/**
 * 장바구니 등록
 * @throws {BackendError}
 */
export const addToCart = async (courseId: string) => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });
};

/**
 * 장바구니 전체 삭제
 * @throws {BackendError}
 */
export const deleteAllCart = async () => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: "DELETE",
  });
};

/**
 * 장바구니 선택 삭제
 * @throws {BackendError}
 */
export const deleteCartItem = async (courseId: number) => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}/items`, {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
  });
};
