import CourseItem from "./CourseItem";
import styles from "./CourseList.module.css";

export default function CourseList({ courses }: any) {
  return (
    <section className={styles.list} aria-label="강좌 목록">
      <div className={styles.grid}>
        {courses.map((course: any) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
