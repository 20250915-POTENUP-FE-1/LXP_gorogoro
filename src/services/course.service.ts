import { Course, CourseDetail, CourseLearn } from "@/features/courses/types";
import {
  CourseFormRequest,
  InstructorCourse,
} from "@/features/intructor/types";
import { MyEnrollmentsResponse } from "@/features/mypage/types";
import { get, post, put, del } from "@/shared/lib/api";
import { fetchWithAuth } from "@/shared/lib/authApi";

const COURSES_ENDPOINT = "courses";
const INSTRUCTOR_COURSES_ENDPOINT = "instructor/courses";
const ENROLLMENTS_ENDPOINT = "enrollments";

/**
 * 강좌 목록 조회
 * @throws {BackendError}
 */
export const getCourses = async (
  apiParams?: any
): Promise<{ contents: Course[] }> => {
  return await get<{ contents: Course[] }>(COURSES_ENDPOINT, apiParams);
};

/**
 * 강사의 강좌 목록 조회
 * @throws {BackendError}
 */
export const getInstructorCourses = async (): Promise<{
  contents: InstructorCourse[];
}> => {
  return await fetchWithAuth(INSTRUCTOR_COURSES_ENDPOINT, {
    method: "GET",
  });
};

/**
 * 강좌 상세 조회
 * @throws {BackendError}
 */
export const getCourseById = async (id: string): Promise<CourseDetail> => {
  return await get<CourseDetail>(`${COURSES_ENDPOINT}/${id}`);
};

/**
 * 학습용 강좌 상세 조회 (수강자 전용 - contents 포함)
 * @throws {BackendError}
 */
export const getCourseLearn = async (id: string): Promise<CourseLearn> => {
  return await fetchWithAuth(`${COURSES_ENDPOINT}/${id}/learn`, {
    method: "GET",
  });
};

/**
 * 내 수강 목록 조회
 * @throws {BackendError}
 */
export const getMyEnrollments = async (): Promise<MyEnrollmentsResponse> => {
  return await fetchWithAuth(`${ENROLLMENTS_ENDPOINT}/my`, {
    method: "GET",
  });
};

/**
 * 강좌 생성
 * @throws {BackendError}
 */
export const createCourse = async (
  body: CourseFormRequest
): Promise<Course> => {
  return await post<Course>(COURSES_ENDPOINT, body);
};

/**
 * 강좌 수정
 * @throws {BackendError}
 */
export const updateCourse = async (
  id: string,
  body: CourseFormRequest
): Promise<Course> => {
  return await put<Course>(`${COURSES_ENDPOINT}/${id}`, body);
};

/**
 * 강좌 삭제
 * @throws {BackendError}
 */
export const deleteCourse = async (id: string) => {
  return await del(`${COURSES_ENDPOINT}/${id}`);
};
