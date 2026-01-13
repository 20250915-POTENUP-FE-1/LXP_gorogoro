import { MOCK_COURSE_LEARN } from '@/app/mockData';
import styles from './page.module.css';
import CourseLearn from '@/features/courses/components/learn/CourseLearn';
import { CourseLearnPageModel } from '@/features/courses/types';

export default function CourseLearnPage() {
  const data: CourseLearnPageModel = MOCK_COURSE_LEARN;

  return (
    <div className={styles.container}>
      <CourseLearn data={data} />
    </div>
  );
}
