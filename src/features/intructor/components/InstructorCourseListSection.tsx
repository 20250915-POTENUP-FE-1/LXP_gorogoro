import styles from "./InstructorCourseListSection.module.css";

interface InstructorCourseListSectionProps {
  courses: any[];
}

export default function InstructorCourseListSection({
  courses,
}: InstructorCourseListSectionProps) {
  return (
    <section className={styles.section} aria-label="내가 생성한 강좌">
      <header className={styles.header}>
        <h1 className={styles.title}>내가 생성한 강좌</h1>
        <span className={styles.count}>총 {courses.length}개의 강좌</span>
      </header>
      <div className={styles.items}>
        {/* {courses.map((course) => (
          <InstructorCourseItem
            key={course.id}
            course={course}
            setCourses={setCourses}
          />
        ))} */}
      </div>
    </section>
  );
}
