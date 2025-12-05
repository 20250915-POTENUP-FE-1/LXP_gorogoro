import courseAPI from "@/services/courseAPI";
import CourseForm from "@/features/intructor/components/CourseForm";

import styles from "./page.module.css";

export default async function CourseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const course = await courseAPI.getCourseById(id);

  return (
    <section className={styles.container}>
      <p>{id}</p>
      <header className={styles.header}>
        <h1 className={styles.title}>내 강좌 수정하기</h1>
        <p className={styles.subtitle}>
          강좌 정보를 업데이트하고 최신 상태로 유지하세요.
        </p>
      </header>
      <CourseForm mode="edit" initialFormData={course} />
    </section>
  );
}
