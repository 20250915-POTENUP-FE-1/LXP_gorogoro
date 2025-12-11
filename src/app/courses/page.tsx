import CategoryBar from "@/features/common/components/CategoryBar";
import CourseList from "@/features/courses/components/CourseList";
import styles from "./page.module.css";
import {
  getAllCategories,
  getCategoriesById,
} from "@/services/category.service";
import { getCourses } from "@/services/course.service";
import { Category } from "@/features/courses/types";
import Link from "next/link";

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<{
    categoryId?: string;
    search?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const categoryQuery = params.categoryId || "";
  const searchQuery = params.search || "";
  const sortQuery = params.sort || "";

  const apiParams = {
    categoryId: categoryQuery,
    search: searchQuery,
    sort: sortQuery,
    limit: "10",
  };

  const categories = await getAllCategories();

  let subCategories: Category[] = [];
  let categoryName = "";

  if (categoryQuery) {
    const currentCategory = await getCategoriesById(categoryQuery);

    // categoryQuery가 1차 카테고리면 그대로 subCategories 사용
    // categoryQuery가 2차 카테고리면 부모의 subCategories 가져오기
    if (currentCategory.parentId === null) {
      // 1차 카테고리
      categoryName = currentCategory.name;
      subCategories = currentCategory.subCategories ?? [];
    } else {
      // 2차 카테고리 → 부모 카테고리의 subCategories 가져오기
      const parentCategory = await getCategoriesById(
        String(currentCategory.parentId)
      );
      categoryName = currentCategory.name;
      subCategories = parentCategory.subCategories ?? [];
    }
  }

  const courses = await getCourses(apiParams);

  const pageTitle = searchQuery
    ? `"${searchQuery}" 검색 결과`
    : `${categoryName} 강좌`;

  return (
    <main className={styles.page}>
      {!categoryQuery ? (
        // 카테고리 선택 페이지
        <div className={`page-wrapper ${styles.container}`}>
          <section className={styles.intro}>
            <h1 className={styles.title}>강좌 카테고리</h1>
            <p className={styles.subtitle}>관심있는 카테고리를 선택해주세요</p>
          </section>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/courses?categoryId=${category.id}`}
              >
                <div className={styles.categoryCard}>
                  <h2>{category.name}</h2>
                  <p>{category.subCategories?.length || 0}개 세부 카테고리</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // 기존 강좌 목록 페이지
        <div className={`page-wrapper ${styles.container}`}>
          <section className={styles.intro}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <span className={styles.subtitle}>
              총 {courses.length}개의 강좌
            </span>
          </section>
          <CategoryBar subCategories={subCategories} />
          <CourseList courses={courses} categories={categories} />
        </div>
      )}
    </main>
  );
}
