import styles from './CourseDetail.module.css';
import { CourseDetailResponse, ReviewListResponse } from '../../types';
import CourseOverview from '@/features/courses/components/detail/CourseOverview';
import CourseSidebarClient from '@/features/courses/components/detail/client/CourseSidebarClient';
import CourseTabsSectionClient from '@/features/courses/components/detail/client/CourseTabsSectionClient';

interface CourseDetailProps {
  course: CourseDetailResponse;
  reviews: ReviewListResponse;
}

export default function CourseDetail({ course, reviews }: CourseDetailProps) {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <CourseOverview course={course} />
            <CourseTabsSectionClient course={course} reviews={reviews} />
          </div>
          <CourseSidebarClient course={course} />
        </div>
      </section>
    </>
  );
}
