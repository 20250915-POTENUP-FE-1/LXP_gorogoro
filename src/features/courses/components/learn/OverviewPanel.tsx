import styles from './OverviewPanel.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface OverviewPanelProps {
  course: CourseDetailResponse;
}
export default function OverviewPanel({ course }: OverviewPanelProps) {
  const title = course.title;
  const courseDescription = course.description;
  const courseSummary = course.summary;
  return (
    <section>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeading}>About this Course</h3>
        <p className={styles.text}>
          이 강좌에서는 <strong>{title}</strong>에 대해 심도 있게 다룹니다. 기초 개념부터 실무 적용
          사례까지 차근차근 확인해보세요. 강의 내용을 따라하면서 직접 코드를 작성해보는 것을
          권장합니다.
        </p>
      </div>
      <div className={styles.sectionBlock}>
        <h3 className={styles.sectionHeading}></h3>
        <p className={styles.bulletList}>{courseDescription}</p>
        <p className={styles.bulletList}>{courseSummary}</p>
      </div>
    </section>
  );
}
