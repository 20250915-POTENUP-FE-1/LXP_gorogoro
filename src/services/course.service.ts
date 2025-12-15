import { Course } from "@/features/courses/types";
import { CourseFormRequest } from "@/features/intructor/types";
import { get, post, put, del } from "@/shared/lib/api";
import { fetchWithAuth } from "@/shared/lib/authApi";

const COURSES_ENDPOINT = "courses";
const INSTRUCTOR_COURSES_ENDPOINT = "instructor/courses";

export const getCourses = async (apiParams?: any): Promise<Course[]> => {
  const response = await get<Course[]>(COURSES_ENDPOINT, apiParams);
  if (response.error) throw response.error;
  return response.data!;
};

export const getInstructorCourses = async (): Promise<Course[]> => {
  const response = await fetchWithAuth(INSTRUCTOR_COURSES_ENDPOINT, {
    method: "GET",
  });
  if (response.error) throw response.error;
  return response.data!;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await get<Course>(`${COURSES_ENDPOINT}/${id}`);
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
