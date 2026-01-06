import CourseDetail from '@/features/courses/components/CourseDetail';
import styles from './page.module.css';
import { getCourseById } from '@/services/course.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강의 상세',
  description: '강의 소개, 커리큘럼, 수강 정보와 후기를 확인하고 수강을 시작하세요.',
};

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const course = await getCourseById(id);

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CourseDetail course={course} categoryName={course.categoryName} />
      </div>
    </main>
  );
}
