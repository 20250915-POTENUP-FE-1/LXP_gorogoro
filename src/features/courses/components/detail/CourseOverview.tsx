import styles from './CourseOverview.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseOverviewProps {
  course: CourseDetailResponse;
}
export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.summary}>{course.summary}</p>
      <div className={styles.metaInfo}>
        <div className={styles.instructorInfo}>
          <span className={styles.instructorName}>{course.instructorName}</span>
        </div>
        <div className={styles.statsInfo}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⭐</span>
            <span className={styles.statLabel}>4.9</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>👥</span>
            <span className={styles.statLabel}>1.2천</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>❤️</span>
            <span className={styles.statLabel}>2.7k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
