import CourseForm from "@/features/intructor/components/CourseForm";
import styles from "./page.module.css";
import { getCourseById } from "@/services/course.service";
import { getAllCategories } from "@/services/category.service";

export default async function CourseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { contents: categories } = await getAllCategories();
  const course = await getCourseById(id);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 강좌 수정하기</h1>
        <p className={styles.subtitle}>
          강좌 정보를 업데이트하고 최신 상태로 유지하세요.
        </p>
      </header>
      <CourseForm
        categories={categories}
        id={id}
        mode="edit"
        initialFormData={course}
      />
    </section>
  );
}
