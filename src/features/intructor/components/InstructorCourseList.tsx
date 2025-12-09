import styles from "./InstructorCourseList.module.css";
import InstructorCourseItem from "./InstructorCourseItem";
interface InstructorCourseListProps {
  courses: any[];
}

export default function InstructorCourseList({
  courses,
}: InstructorCourseListProps) {
  return (
    <section className={styles.list} aria-label="내가 생성한 강좌">
      <header className={styles.header}>
        <h1 className={styles.title}>내가 생성한 강좌</h1>
        <span className={styles.count}>총 {courses.length}개의 강좌</span>
      </header>
      <div className={styles.items}>
        {courses.map((course) => (
          <InstructorCourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
