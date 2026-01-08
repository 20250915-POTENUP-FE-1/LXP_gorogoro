import styles from '@/features/courses/components/detail/CourseDetail.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseOverviewProps {
  course: CourseDetailResponse;
}
export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div>
      <h1 className={styles.title}>{course.title}</h1>
      <p className={styles.summary}>{course.summary}</p>
      <div className={styles.metaInfo}>
        <div className={styles.instructorInfo}>
          <span className={styles.instructorName}>{course.instructorName}</span>
        </div>
        <div className={styles.statsInfo}>
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statIcon}>:star:</span>*/}
          {/*  <span className={styles.statValue}>{course.rating}</span>*/}
          {/*  <span className={styles.statLabel}>({course.reviewCount.toLocaleString()})</span>*/}
          {/*</div>*/}
          {/*<span className={styles.statDivider}>|</span>*/}
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statIcon}>👥</span>*/}
          {/*  <span className={styles.statValue}>{course.studentCount.toLocaleString()}</span>*/}
          {/*  <span className={styles.statLabel}>수강생</span>*/}
          {/*</div>*/}
          {/*<span className={styles.statDivider}>|</span>*/}
          {/*<div className={styles.statItem}>*/}
          {/*  <span className={styles.statIcon}>❤️</span>*/}
          {/*  <span className={styles.statValue}>{course.likeCount.toLocaleString()}</span>*/}
          {/*  <span className={styles.statLabel}>좋아요</span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
