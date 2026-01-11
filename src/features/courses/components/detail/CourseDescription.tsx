import styles from './CourseDescription.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseDescriptionProps {
  course: CourseDetailResponse;
}

export default function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <div className={styles.descriptionSection}>
      <h2 className={styles.sectionTitle}>상세정보</h2>
      <h5>{course.title}</h5>
      <p>{course.description}</p>
    </div>
  );
}
