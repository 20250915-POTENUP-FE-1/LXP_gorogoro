import courseAPI from "@/services/courseAPI";
import CourseDetail from "@/features/courses/components/CourseDetail";

import styles from "./page.module.css";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await courseAPI.getCourseById(id);

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} />
      </div>
    </main>
  );
}
