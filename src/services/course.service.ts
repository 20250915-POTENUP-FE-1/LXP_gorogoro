import {
  CourseDetailResponse,
  CoursesResponse,
  CreateQnaQuestionRequest,
  CreateQnaReplyRequest,
  DeleteChaptersRequest,
  DeleteLessonsRequest,
  UnansweredQnaResponse,
  LessonQnaListResponse,
  QnaThreadResponse,
  ReviewRequest,
  ReviewsResponse,
  UpdateQnaRequest,
} from '@/features/courses/types';
import { CourseFormRequest, InstructorCoursesResponse } from '@/features/instructor/types';
import { del, get, patch, post } from '@/shared/lib/api';
import { fetchWithAuth } from '@/shared/lib/authApi';

const COURSES_ENDPOINT = 'courses';
const INSTRUCTOR_COURSES_ENDPOINT = 'instructor/courses';
const CHAPTERS_ENDPOINT = 'chapters';
const LESSONS_ENDPOINT = 'lessons';
const REVIEW_ENDPOINT = 'reviews';
const QNA_ENDPOINT = 'qna';
const REPLIES_ENDPOINT = 'replies';
const THREAD_ENDPOINT = 'thread';
const QNA_UNANSWERED_ENDPOINT = 'qna/instructors/unanswered';
// const ENROLLMENTS_ENDPOINT = 'enrollments';

/**
 * 강좌 목록 조회
 * GET /api/courses
 * @throws {BackendError}
 */
type CourseRequest = {
  categoryId: number | null;
};
export const getCourses = async ({ categoryId }: CourseRequest): Promise<CoursesResponse> => {
  return await get<CoursesResponse>(`${COURSES_ENDPOINT}`, {
    categoryId: categoryId ?? undefined,
  });
};

/**
 * 강좌 상세 조회
 * GET /api/courses/{courseId}
 * @throws {BackendError}
 */
export const getCourseById = async (courseId: number): Promise<CourseDetailResponse> => {
  return await get<CourseDetailResponse>(`${COURSES_ENDPOINT}/${courseId}`);
};

/**
 * [강사] 강좌 목록 조회 (인증 필요)
 * GET /api/instructor/courses
 * @throws {BackendError}
 */
export const getInstructorCourses = async (): Promise<InstructorCoursesResponse> => {
  return await get<InstructorCoursesResponse>(INSTRUCTOR_COURSES_ENDPOINT);
};

/**
 * [강사] 강좌 생성 (인증 필요)
 * POST /api/courses
 * @throws {BackendError}
 */
export const createCourse = async (body: CourseFormRequest): Promise<void> => {
  await post<void>(COURSES_ENDPOINT, JSON.stringify(body));
};

/**
 * [강사] 강좌 수정 (인증 필요)
 * PUT /api/courses/{courseId}
 * @throws {BackendError}
 */
export const updateCourse = async (courseId: number, body: CourseFormRequest): Promise<void> => {
  await patch<void>(`${COURSES_ENDPOINT}/${courseId}`, JSON.stringify(body));
};

/**
 * [강사] 강좌 삭제 (인증 필요)
 * DELETE /api/courses/{courseId}
 * @throws {BackendError}
 */
export const deleteCourse = async (courseId: number): Promise<void> => {
  await del<void>(`${COURSES_ENDPOINT}/${courseId}`);
};

/**
 * [강사] 챕터 삭제 (인증 필요)
 * DELETE /api/courses/{courseId}/chapters
 * @throws {BackendError}
 */
export const deleteCourseChapters = async (
  courseId: number,
  body: DeleteChaptersRequest,
): Promise<void> => {
  await fetchWithAuth<void>(`${COURSES_ENDPOINT}/${courseId}/${CHAPTERS_ENDPOINT}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
};

/**
 * [강사] 레슨 삭제 (인증 필요)
 * DELETE /api/courses/{courseId}/chapters/{chapterId}/lessons
 * @throws {BackendError}
 */
export const deleteChapterLessons = async (
  courseId: number,
  chapterId: number,
  body: DeleteLessonsRequest,
): Promise<void> => {
  await fetchWithAuth<void>(
    `${COURSES_ENDPOINT}/${courseId}/${CHAPTERS_ENDPOINT}/${chapterId}/${LESSONS_ENDPOINT}`,
    {
      method: 'DELETE',
      body: JSON.stringify(body),
    },
  );
};

/**
 * 리뷰 조회
 * GET /api/courses/{courseId}/reviews
 */
export const getReviews = async (): Promise<ReviewsResponse> => {
  return await fetchWithAuth<ReviewsResponse>(REVIEW_ENDPOINT, {
    method: 'GET',
  });
};

/**
 * 리뷰 상세 조회
 * GET /api/courses/{courseId}/reviews/{reviewId}
 */
export const getReviewById = async (reviewId: number): Promise<void> => {
  return await fetchWithAuth<void>(`${REVIEW_ENDPOINT}/${reviewId}`, {
    method: 'GET',
  });
};

/**
 * 리뷰 생성
 * POST /api/courses/{courseId}/reviews
 */
export const createReview = async (courseId: number, body: ReviewRequest) => {
  await fetchWithAuth<void>(`${COURSES_ENDPOINT}/${courseId}/${REVIEW_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * 리뷰 수정
 * PUT /api/courses/{courseId}/reviews/{reviewId}
 */
export const updateReview = async (courseId: number, reviewId: number, body: ReviewRequest) => {
  await fetchWithAuth(`${COURSES_ENDPOINT}/${courseId}/${REVIEW_ENDPOINT}/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

/**
 * 리뷰 삭제
 * DELETE /api/courses/{courseId}/reviews/{reviewId}
 */
export const deleteReview = async (courseId: number, reviewId: number) => {
  await fetchWithAuth(`${COURSES_ENDPOINT}/${courseId}/${REVIEW_ENDPOINT}/${reviewId}`, {
    method: 'DELETE',
  });
};

/**
 * 레슨 단위 QnA 목록 조회 (root 질문 목록)
 * GET /api/courses/{courseId}/lessons/{lessonId}
 */
export const getLessonQna = async (
  courseId: number,
  lessonId: number,
): Promise<LessonQnaListResponse> => {
  return await get<LessonQnaListResponse>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}`,
  );
};

/**
 * QnA 스레드 상세 조회 (root 질문 + 답변 전체)
 * GET /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread
 */
export const getQnaThread = async (
  courseId: number,
  lessonId: number,
  questionId: number,
): Promise<QnaThreadResponse> => {
  return await get<QnaThreadResponse>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}/${questionId}/${THREAD_ENDPOINT}`,
  );
};

/**
 * 질문 생성
 * POST /api/courses/{courseId}/lessons/{lessonId}/qna
 */
export const createQnaQuestion = async (
  courseId: number,
  lessonId: number,
  body: CreateQnaQuestionRequest,
): Promise<void> => {
  await fetchWithAuth<void>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};

/**
 * 답변 추가
 * POST /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies
 */
export const createQnaReply = async (
  courseId: number,
  lessonId: number,
  questionId: number,
  body: CreateQnaReplyRequest,
): Promise<void> => {
  await fetchWithAuth<void>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}/${questionId}/${REPLIES_ENDPOINT}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );
};

/**
 * 질문/답변 수정
 * PATCH /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}
 */
export const updateQna = async (
  courseId: number,
  lessonId: number,
  questionId: number,
  body: UpdateQnaRequest,
): Promise<void> => {
  await fetchWithAuth<void>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}/${questionId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
  );
};

/**
 * 질문/답변 삭제
 * DELETE /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}
 */
export const deleteQna = async (
  courseId: number,
  lessonId: number,
  questionId: number,
): Promise<void> => {
  await fetchWithAuth<void>(
    `${COURSES_ENDPOINT}/${courseId}/${LESSONS_ENDPOINT}/${lessonId}/${QNA_ENDPOINT}/${questionId}`,
    { method: 'DELETE' },
  );
};

/**
 * [강사] 미답변 질문 조회
 * GET /api/qna/instructors/unanswered?limit=
 */
export type UnansweredQnaParams = {
  limit?: number; // default 3, max 10
};

export const getUnansweredQna = async (
  params?: UnansweredQnaParams,
): Promise<UnansweredQnaResponse> => {
  const search = new URLSearchParams();
  if (params?.limit) search.set('limit', String(params.limit));

  const qs = search.toString();
  const endpoint = `${QNA_UNANSWERED_ENDPOINT}${qs ? `?${qs}` : ''}`;

  return await fetchWithAuth<UnansweredQnaResponse>(endpoint, { method: 'GET' });
};

// 미개발 api
/**
 * 학습용 강좌 상세 조회 (수강자 전용)
 * @throws {BackendError}
 */
// export const getCourseLearn = async (courseId: number): Promise<> => {
//   return await fetchWithAuth(`${COURSES_ENDPOINT}/${courseId}/learn`, {
//     method: 'GET',
//   });
// };

/**
 * 내 수강 목록 조회
 * @throws {BackendError}
 */
// export const getMyEnrollments = async (): Promise<> => {
//   return await fetchWithAuth(`${ENROLLMENTS_ENDPOINT}/my`, {
//     method: 'GET',
//   });
// };
