import { fetchWithAuth } from '@/shared/lib/authApi';
import { CartRequest, CartResponse } from '@/features/cart/types';

const CARTS_ENDPOINT = 'carts';

/**
 * 장바구니 조회
 * GET /api/carts
 * @throws {BackendError}
 */
export const getCart = async (): Promise<CartResponse> => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: 'GET',
  });
};

/**
 * 장바구니 등록
 * POST /api/carts
 * @throws {BackendError}
 */
export const addToCart = async (body: CartRequest): Promise<void> => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * 장바구니 전체 삭제
 * DELETE /api/carts
 * @throws {BackendError}
 */
export const deleteAllCart = async (): Promise<void> => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}`, {
    method: 'DELETE',
  });
};

/**
 * 장바구니 선택 삭제
 * DELETE /api/carts/items
 * @throws {BackendError}
 */
export const deleteCartItem = async (body: CartRequest): Promise<void> => {
  return await fetchWithAuth(`${CARTS_ENDPOINT}/items`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
};
