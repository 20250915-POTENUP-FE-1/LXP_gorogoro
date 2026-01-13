import styles from './page.module.css';
import CourseLearn from '@/features/courses/components/learn/CourseLearn';
import { MOCK_COURSE_DETAIL } from '@/app/mockData';
import { getCourseById } from '@/services/course.service';
import { CourseDetailResponse } from '@/features/courses/types';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function CourseLearnPage({ params }: Props) {
  // api 연동
  const id = await params;
  const courseId = Number(id);
  const data: CourseDetailResponse = await getCourseById(courseId);

  // const data = MOCK_COURSE_DETAIL;

  return (
    <div className={styles.container}>
      <CourseLearn data={data} />
    </div>
  );
}
