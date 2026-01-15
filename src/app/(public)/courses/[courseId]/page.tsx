import CourseDetail from '@/features/courses/components/detail/CourseDetail';
import styles from './page.module.css';
import { Metadata } from 'next';
import { getCourseById, getReviews } from '@/services/course.service';
import { MOCK_COURSE_DETAIL, MOCK_REVIEWS } from '@/app/mockData';
export const metadata: Metadata = {
  title: '강의 상세',
  description: '강의 소개, 커리큘럼, 수강 정보와 후기를 확인하고 수강을 시작하세요.',
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  // api 연동
  // const { courseId: courseIdStr } = await params;
  // const courseId = Number(courseIdStr);
  // const course = await getCourseById(courseId);
  // const reviews = await getReviews(courseId);
  // // MOCK DATA

  const course = MOCK_COURSE_DETAIL;
  const reviews = MOCK_REVIEWS;
  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} reviews={reviews} />
      </div>
    </main>
  );
}
