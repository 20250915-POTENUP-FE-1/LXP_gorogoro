import { fetchWithAuth } from '@/shared/lib/authApi';
import { GetCartResponse } from '@/features/cart/types';

const CARTS_ENDPOINT = 'carts';

/**
 * 장바구니 조회
 * GET /api/carts
 * @throws {BackendError}
 */
export const getCart = async (): Promise<GetCartResponse> => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: 'GET',
  });
};

/**
 * 장바구니 등록
 * POST /api/carts
 * @throws {BackendError}
 */
export const addToCart = async (courseId: number): Promise<void> => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ courseId }),
  });
};

/**
 * 장바구니 전체 삭제
 * DELETE /api/carts
 * @throws {BackendError}
 */
export const deleteAllCart = async (): Promise<void> => {
  return await fetchWithAuth(CARTS_ENDPOINT, {
    method: 'DELETE',
  });
};

/**
 * 장바구니 선택 삭제
 * DELETE /api/carts/items
 * @throws {BackendError}
 */
export const deleteCartItem = async (courseId: number): Promise<void> => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}/items`, {
    method: 'DELETE',
    body: JSON.stringify({ courseId }),
  });
};
