import { Category } from "@/features/courses/types";
import { del, get, post } from "@/shared/lib/api";

const CATEGORIES_ENDPOINT = "categories";

//모든 카테고리
export const getAllCategories = async (): Promise<{ contents: Category[] }> => {
  const response = await get<{ contents: Category[] }>(CATEGORIES_ENDPOINT);
  if (response.error) throw response.error;
  return response.data!;
};

export const getCategoriesById = async (id: string): Promise<Category> => {
  const response = await get<Category>(`${CATEGORIES_ENDPOINT}/${id}`);
  if (response.error) throw response.error;
  return response.data!;
};

//카테고리 추가
export const createCategory = async (body: unknown): Promise<Category> => {
  const response = await post<Category>(CATEGORIES_ENDPOINT, body);
  if (response.error) throw response.error;
  return response.data!;
};

//카테고리 삭제
export const deleteCategory = async (id: string) => {
  const response = await del(`${CATEGORIES_ENDPOINT}/${id}`);
  if (response.error) throw response.error;
  return response.data;
};
