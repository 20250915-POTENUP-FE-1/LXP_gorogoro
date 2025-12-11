import { Course } from "@/features/courses/types";
import { CourseFormRequest } from "@/features/intructor/types";
import { get, post, patch, del } from "@/shared/lib/api";

const COURSES_ENDPOINT = "courses";

export const getCourses = async (apiParams: any): Promise<Course[]> => {
  const data = await get(COURSES_ENDPOINT, apiParams);
  return data as Course[];
};

export const getCourseById = async (id: string): Promise<Course> => {
  const data = await get(`${COURSES_ENDPOINT}/${id}`);
  return data as Course;
};

export const createCourse = async (
  body: CourseFormRequest
): Promise<Course> => {
  const data = await post(COURSES_ENDPOINT, body);
  return data as Course;
};

export const updateCourse = async (
  id: string,
  body: CourseFormRequest
): Promise<Course> => {
  const data = await patch(`${COURSES_ENDPOINT}/${id}`, body);
  return data as Course;
};

export const deleteCourse = async (id: string) => {
  const data = await del(`${COURSES_ENDPOINT}/${id}`);
  return data;
};
