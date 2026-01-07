import { CategoriesResponse } from '@/features/courses/types';
import { get } from '@/shared/lib/api';

const CATEGORIES_ENDPOINT = 'categories';

/**
 * 모든 카테고리 조회
 * @throws {BackendError}
 */
export const getAllCategories = async (): Promise<CategoriesResponse> => {
  return await get<CategoriesResponse>(CATEGORIES_ENDPOINT);
};

// 미개발 api
/**
 * 카테고리 상세 조회
 * @throws {BackendError}
 */
// export const getCategoriesById = async (id: string): Promise<Category> => {
//   return await get<Category>(`${CATEGORIES_ENDPOINT}/${id}`);
// };

/**
 * 카테고리 추가
 * @throws {BackendError}
 */
// export const createCategory = async (body: unknown): Promise<Category> => {
//   return await post<Category>(CATEGORIES_ENDPOINT, body);
// };

/**
 * 카테고리 삭제
 * @throws {BackendError}
 */
// export const deleteCategory = async (id: string) => {
//   return await del(`${CATEGORIES_ENDPOINT}/${id}`);
// };
