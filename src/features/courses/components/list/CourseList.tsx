import { Course } from '../../types';
import CourseItem from './CourseItem';
import styles from './CourseList.module.css';

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <section className={styles.list} aria-label="강좌 목록">
      <div className={styles.grid}>
        {courses.map((course) => (
          <CourseItem key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
