import CourseDetail from "@/features/courses/components/CourseDetail";
import styles from "./page.module.css";
import { getCourseById } from "@/services/course.service";
import { getAllCategories } from "@/services/category.service";
import { getCategoryNameById } from "@/shared/lib/utils";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const categories = await getAllCategories();
  const course = await getCourseById(id);
  const categoryName = getCategoryNameById(categories, course.categoryId);

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} categoryName={categoryName} />
      </div>
    </main>
  );
}
