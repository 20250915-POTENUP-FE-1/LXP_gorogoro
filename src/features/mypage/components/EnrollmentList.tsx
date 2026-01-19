import EnrollmentItem from './EnrollmentItem';
import styles from './EnrollmentList.module.css';
import { EnrollResponse } from '@/features/courses/types';

interface EnrollmentListProps {
  enrollments: EnrollResponse;
}

export default function EnrollmentList({ enrollments }: EnrollmentListProps) {
  const enrolls = enrollments.contents;
  return (
    <section className={styles.list}>
      <div className={styles.items}>
        {enrolls?.map((enroll) => (
          <EnrollmentItem key={enroll.courseId} enroll={enroll} />
        ))}
      </div>
    </section>
  );
}
