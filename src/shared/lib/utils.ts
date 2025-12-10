import { Category } from "@/features/courses/types";

export function getCategoryNameById(
  categories: Category[],
  categoryId: string | number
): string {
  // 1차 카테고리에서 찾기
  const primaryCategory = categories.find((cat) => cat.id === categoryId);
  if (primaryCategory) return primaryCategory.name;

  for (const category of categories) {
    const subCategory = category.subCategories?.find(
      (sub) => sub.id === categoryId
    );
    if (subCategory) return subCategory.name;
  }

  return "Unknown"; // 못 찾은 경우
}
