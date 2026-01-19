import styles from './page.module.css';
import CourseLearn from '@/features/courses/components/learn/CourseLearn';
import { getCourseById, getLessonQna } from '@/services/course.service';
import { LessonQnaListResponse } from '@/features/courses/types';

export default async function CourseLearnPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lessonId: string | undefined }>;
}) {
  const { courseId: courseIdStr } = await params;
  const { lessonId: lessonIdStr } = await searchParams;

  const courseId = Number(courseIdStr);

  const course = await getCourseById(courseId);
  const lessonIdFromQuery = lessonIdStr;

  const firstLessonId = course.chapters?.[0]?.lessons?.[0].lessonId;
  const activeLessonId = lessonIdFromQuery ? Number(lessonIdFromQuery) : firstLessonId;

  const qnaList: LessonQnaListResponse = activeLessonId
    ? await getLessonQna(courseId, activeLessonId)
    : { questions: [] };

  return (
    <div className={styles.container}>
      <CourseLearn course={course} qnaList={qnaList} />
    </div>
  );
}
