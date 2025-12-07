import CategoryBar from "@/features/common/components/CategoryBar";
import CourseList from "@/features/courses/components/CourseList";
import styles from "./page.module.css";
import { getAllCategories } from "@/services/category.service";
import { getCourses } from "@/services/course.service";

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const categoryQuery = params.category || "";
  const searchQuery = params.search || "";
  const sortQuery = params.sort || "";

  const apiParams = {
    category: categoryQuery,
    search: searchQuery,
    sort: sortQuery,
    limit: "10",
  };

  const categories = await getAllCategories();
  const courses = await getCourses();

  const pageTitle = searchQuery
    ? `"${searchQuery}" 검색 결과`
    : `${categoryQuery} 강좌`;

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <section className={styles.intro}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <span className={styles.subtitle}>총 {courses.length}개의 강좌</span>
        </section>
        <CategoryBar categories={categories} />
        <CourseList courses={courses} categories={categories} />
      </div>
    </main>
  );
}
