import EnrollmentItem from "@/features/mypage/components/EnrollmentItem";
import styles from "./EnrollmentListSection.module.css";

interface EnrollmentListSectionProps {
  courses: any[];
  coursesCount: number;
}

export default function EnrollmentListSection({
  courses,
  coursesCount,
}: EnrollmentListSectionProps) {
  return (
    <section className={styles.section} aria-label="수강 중인 강좌">
      <header className={styles.header}>
        <h1 className={styles.title}>내가 수강 중인 강좌</h1>
        <span className={styles.count}>총 {coursesCount} 개의 강좌</span>
      </header>
      <div className={styles.items}>
        {/* {courses.map((course: any) => (
          <EnrollmentItem key={course.id} course={course} />
        ))} */}
      </div>
    </section>
  );
}
