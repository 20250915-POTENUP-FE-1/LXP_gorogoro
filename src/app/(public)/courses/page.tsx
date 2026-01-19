import styles from './page.module.css';
import { Metadata } from 'next';
import CourseList from '@/features/courses/components/list/CourseList';
import { getCourses } from '@/services/course.service';
import { MOCK_COURSES } from '@/app/mockData';

const PAGE_TITLE = '전체 강의';
const PAGE_DESC = '관심 있는 강의를 탐색하고 커리큘럼, 난이도, 수강 기간을 한눈에 확인하세요.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
};

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId: string }>;
}) {
  const { categoryId: categoryIdStr } = await searchParams;
  const categoryId = categoryIdStr ? Number(categoryIdStr) : null;

  const { contents: courses } = await getCourses({ categoryId });
  // MOCK DATA
  // const { contents: courses } = MOCK_COURSES;
  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <section className={styles.intro}>
          <h1 className={styles.title}>{PAGE_TITLE}</h1>
          <span className={styles.subtitle}>총 {courses.length}개의 강좌</span>
        </section>
        <CourseList courses={courses} />
      </div>
    </main>
  );
}
