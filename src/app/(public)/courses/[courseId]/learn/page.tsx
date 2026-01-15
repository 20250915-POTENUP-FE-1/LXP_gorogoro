import styles from './page.module.css';
import CourseLearn from '@/features/courses/components/learn/CourseLearn';
import { MOCK_COURSE_DETAIL, MOCK_LESSON_QNA_LIST } from '@/app/mockData';
import { getCourseById, getLessonQna, getQnaThread } from '@/services/course.service';
import { CourseDetailResponse, LessonQnaListResponse } from '@/features/courses/types';

export default async function CourseLearnPage({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lessonId: string }>;
}) {
  const { courseId: courseIdStr } = await params;
  const { lessonId: lessonIdStr } = await searchParams;
  const courseId = Number(courseIdStr);
  const lessonId = Number(lessonIdStr);
  // api 연동
  //const course: CourseDetailResponse = await getCourseById(courseId);
  // 레슨 단위 qna 리스트 조회 api - getLessonQna()
  // 응답에 questionId,courseId,lessonId,title,authorId,status,replyCount,lastActivityAt
  // const qnaList: LessonQnaListResponse = lessonId
  //   ? await getLessonQna(courseId, lessonId)
  //   : { questions: [] };

  // MOCK DATA
  const course = MOCK_COURSE_DETAIL;
  let qnaList: LessonQnaListResponse;
  qnaList = {
    questions: MOCK_LESSON_QNA_LIST.questions.filter((q) => String(q.lessonId) === lessonIdStr),
  };

  return (
    <div className={styles.container}>
      <CourseLearn course={course} qnaList={qnaList} />
    </div>
  );
}
