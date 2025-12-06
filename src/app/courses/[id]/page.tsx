import CourseDetail from "@/features/courses/components/CourseDetail";
import styles from "./page.module.css";
import { getCourseById } from "@/services/course.service";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourseById(id);

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} />
      </div>
    </main>
  );
}
