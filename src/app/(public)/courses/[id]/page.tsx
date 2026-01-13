import CourseDetail from '@/features/courses/components/detail/CourseDetail';
import styles from './page.module.css';
import { Metadata } from 'next';
import { getCourseById } from '@/services/course.service';
import { MOCK_COURSE_DETAIL } from '@/app/mockData';

export const metadata: Metadata = {
  title: '강의 상세',
  description: '강의 소개, 커리큘럼, 수강 정보와 후기를 확인하고 수강을 시작하세요.',
};
type Props = {
  params: Promise<{ id: string }>;
};
export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const courseId = Number(id);
  // api 연동
  // const course = await getCourseById(courseId);
  // MOCK DATA
  const course = MOCK_COURSE_DETAIL;
  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} />
      </div>
    </main>
  );
}
