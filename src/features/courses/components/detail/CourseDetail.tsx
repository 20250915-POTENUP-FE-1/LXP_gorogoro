import styles from './CourseDetail.module.css';
import { CourseDetailResponse, Qna, Reviews } from '../../types';
import CourseOverview from '@/features/courses/components/detail/CourseOverview';
import CourseSidebarClient from '@/features/courses/components/detail/client/CourseSidebarClient';
import CourseTabsSectionClient from '@/features/courses/components/detail/client/CourseTabsSectionClient';

interface CourseDetailProps {
  course: CourseDetailResponse & Reviews & Qna; // MOCK DATA TYPE: Reviews & Qna
}

export default function CourseDetail({ course }: CourseDetailProps) {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <CourseOverview course={course} />
            <CourseTabsSectionClient course={course} />
          </div>
          <CourseSidebarClient course={course}></CourseSidebarClient>
        </div>
      </section>
    </>
  );
}
