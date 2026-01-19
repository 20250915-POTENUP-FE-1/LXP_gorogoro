import { CategoriesResponse } from '@/features/courses/types';
import { fetchWithAuth } from '@/shared/lib/authApi';

const CATEGORIES_ENDPOINT = 'categories';

/**
 * 모든 카테고리 조회
 * @throws {BackendError}
 */
export const getAllCategories = async (): Promise<CategoriesResponse> => {
  return await fetchWithAuth<CategoriesResponse>(CATEGORIES_ENDPOINT, {
    method: 'GET',
  });
};
