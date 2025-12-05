import Link from "next/link";
import styles from "./CourseItem.module.css";

export default function CourseItem({ course }: any) {
  return (
    <Link href={`/courses/${course.id}`}>
      <article className={styles.item} key={course.id}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={course.thumbnailUrl} />
        </div>
        <div className={styles.body}>
          <p className={styles.category}>{course.category}</p>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.price}>{course.price}</p>
          <p className={styles.instructor}>{course.instructorName}</p>
        </div>
      </article>
    </Link>
  );
}
