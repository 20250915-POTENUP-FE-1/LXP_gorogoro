import { Course, Category } from "../types";
import CourseItem from "./CourseItem";
import styles from "./CourseList.module.css";

interface CourseListProps {
  categories: Category[];
  courses: Course[];
}
export default function CourseList({ categories, courses }: CourseListProps) {
  return (
    <section className={styles.list} aria-label="강좌 목록">
      <div className={styles.grid}>
        {courses.map((course: any) => (
          <CourseItem key={course.id} categories={categories} course={course} />
        ))}
      </div>
    </section>
  );
}
