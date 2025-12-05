import EnrollmentItem from "./EnrollmentItem";
import styles from "./EnrollmentList.module.css";

interface EnrollmentListProps {
  courses: any[];
  coursesCount: number;
}

export default function EnrollmentList({
  courses,
  coursesCount,
}: EnrollmentListProps) {
  return (
    <section className={styles.list}>
      <h1 className={styles.title}>총 {coursesCount}개의 수강중인 강좌</h1>
      <div className={styles.items}>
        {courses.map((course: any) => (
          <EnrollmentItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
