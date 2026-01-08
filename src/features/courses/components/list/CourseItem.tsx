import Link from 'next/link';
import styles from './CourseItem.module.css';
import { Course } from '../../types';
import Image from 'next/image';

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <article className={styles.item} key={course.id}>
        <div className={styles.imageWrapper}>
          <Image className={styles.image} src={course.coverImageUrl} alt="" />
        </div>
        <div className={styles.body}>
          <p className={styles.category}>{course.categoryName}</p>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.price}>{course.price}</p>
          <p className={styles.instructor}>{course.instructorName}</p>
        </div>
      </article>
    </Link>
  );
}
