import { Category } from "@/features/courses/types";
import { del, get, post } from "@/shared/lib/api";

const CATEGORIES_ENDPOINT = "categories";

//모든 카테고리
export const getAllCategories = async (): Promise<Category[]> => {
  const data = await get(CATEGORIES_ENDPOINT);
  return data as Category[];
};

export const getCategoriesById = async (id: string): Promise<Category> => {
  const data = await get(`${CATEGORIES_ENDPOINT}/${id}`);
  return data as Category;
};

//카테고리 추가
export const createCategory = async (body: unknown): Promise<Category> => {
  const data = await post(CATEGORIES_ENDPOINT, body);
  return data as Category;
};

//카테고리 삭제
export const deleteCategory = async (id: string) => {
  const data = await del(`${CATEGORIES_ENDPOINT}/${id}`);
  return data;
};
