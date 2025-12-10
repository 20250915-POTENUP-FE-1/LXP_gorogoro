import Link from "next/link";
import styles from "./CourseItem.module.css";
import { Category, Course } from "../types";
import { getCategoryNameById } from "@/shared/lib/utils";

interface CourseItemProps {
  categories: Category[];
  course: Course;
}

export default function CourseItem({ categories, course }: CourseItemProps) {
  const categoryName = getCategoryNameById(categories, course.categoryId);
  return (
    <Link href={`/courses/${course.id}`}>
      <article className={styles.item} key={course.id}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={course.coverImageUrl} />
        </div>
        <div className={styles.body}>
          <p className={styles.category}>{categoryName}</p>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.price}>{course.price}</p>
          <p className={styles.instructor}>{course.instructorName}</p>
        </div>
      </article>
    </Link>
  );
}
