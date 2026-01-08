import {
  CourseDetailResponse,
  CoursesResponse,
  DeleteChaptersRequest,
  DeleteLessonsRequest,
} from '@/features/courses/types';
import { CourseFormRequest, InstructorCoursesResponse } from '@/features/intructor/types';
import { get } from '@/shared/lib/api';
import { fetchWithAuth } from '@/shared/lib/authApi';

const COURSES_ENDPOINT = 'courses';
const INSTRUCTOR_COURSES_ENDPOINT = 'instructor/courses';
const CHAPTERS_ENDPOINT = 'chapters';
const LESSONS_ENDPOINT = 'lessons';
// const ENROLLMENTS_ENDPOINT = 'enrollments';

/**
 * 강좌 목록 조회
 * GET /api/courses
 * @throws {BackendError}
 */
export type GetCoursesParams = { categoryId: number } & Record<string, any>;
export const getCourses = async (apiParams: GetCoursesParams): Promise<CoursesResponse> => {
  return await get<CoursesResponse>(COURSES_ENDPOINT, apiParams);
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
  return await fetchWithAuth<InstructorCoursesResponse>(INSTRUCTOR_COURSES_ENDPOINT, {
    method: 'GET',
  });
};

/**
 * [강사] 강좌 생성 (인증 필요)
 * POST /api/courses
 * @throws {BackendError}
 */
export const createCourse = async (body: CourseFormRequest): Promise<void> => {
  await fetchWithAuth<void>(COURSES_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

/**
 * [강사] 강좌 수정 (인증 필요)
 * PUT /api/courses/{courseId}
 * @throws {BackendError}
 */
export const updateCourse = async (courseId: number, body: CourseFormRequest): Promise<void> => {
  await fetchWithAuth<void>(`${COURSES_ENDPOINT}/${courseId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

/**
 * [강사] 강좌 삭제 (인증 필요)
 * DELETE /api/courses/{courseId}
 * @throws {BackendError}
 */
export const deleteCourse = async (courseId: number): Promise<void> => {
  await fetchWithAuth<void>(`${COURSES_ENDPOINT}/${courseId}`, {
    method: 'DELETE',
  });
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
