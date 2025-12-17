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

export const getCourses = async (
  apiParams?: any
): Promise<{ contents: Course[] }> => {
  const response = await get<{ contents: Course[] }>(
    COURSES_ENDPOINT,
    apiParams
  );
  if (response.error) throw response.error;
  return response.data!;
};

export const getInstructorCourses = async (): Promise<{
  contents: InstructorCourse[];
}> => {
  const response = await fetchWithAuth(INSTRUCTOR_COURSES_ENDPOINT, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data!;
};

export const getCourseById = async (id: string): Promise<CourseDetail> => {
  const response = await get<CourseDetail>(`${COURSES_ENDPOINT}/${id}`);
  if (response.error) throw response.error;
  return response.data!;
};

// 학습용 강좌 상세 조회 (수강자 전용 - contents 포함)
export const getCourseLearn = async (id: string): Promise<CourseLearn> => {
  const response = await fetchWithAuth(`${COURSES_ENDPOINT}/${id}/learn`, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data!;
};

// 내 수강 목록 조회
export const getMyEnrollments = async (): Promise<MyEnrollmentsResponse> => {
  const response = await fetchWithAuth(`${ENROLLMENTS_ENDPOINT}/my`, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data!;
};

export const createCourse = async (
  body: CourseFormRequest
): Promise<Course> => {
  const response = await post<Course>(COURSES_ENDPOINT, body);
  if (response.error) throw response.error;
  return response.data!;
};

export const updateCourse = async (
  id: string,
  body: CourseFormRequest
): Promise<Course> => {
  const response = await put<Course>(`${COURSES_ENDPOINT}/${id}`, body);
  if (response.error) throw response.error;
  return response.data!;
};

export const deleteCourse = async (id: string) => {
  const response = await del(`${COURSES_ENDPOINT}/${id}`);
  if (response.error) throw response.error;
  return response.data;
};
