import styles from './CourseDetail.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseDescriptionProps {
  course: CourseDetailResponse;
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>{course.title}</h2>
      <p className={styles.paragraph}>{course.description}</p>
    </div>
  );
}
