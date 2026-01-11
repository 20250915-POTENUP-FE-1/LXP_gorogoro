import CourseForm from '@/features/instructor/components/CourseForm';
import styles from './page.module.css';
import { getCourseById } from '@/services/course.service';
import { Metadata } from 'next';
import mapCourseDetailForm from '@/features/instructor/utils/mapCourseDetailToForm';

export const metadata: Metadata = {
  title: '강의 수정',
  description: '강의 제목/소개/커리큘럼 등 강의 정보를 수정하고 최신 상태로 반영하세요.',
};

export default async function CourseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);
  const course = await getCourseById(courseId);
  const initialFormData = mapCourseDetailForm(course);
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>내 강좌 수정하기</h1>
        <p className={styles.subtitle}>강좌 정보를 업데이트하고 최신 상태로 유지하세요.</p>
      </header>
      <CourseForm mode="edit" courseId={courseId} initialFormData={initialFormData} />
    </section>
  );
}
