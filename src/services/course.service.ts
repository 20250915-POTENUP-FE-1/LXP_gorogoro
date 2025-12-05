import { Course } from "@/features/courses/types";
import { get, post, put, del } from "@/shared/lib/api";

const COURSES_ENDPOINT = "courses";

export const getCourses = async (): Promise<Course[]> => {
  const data = await get(COURSES_ENDPOINT);
  return data as Course[];
};

export const getCourseById = async (id: string): Promise<Course> => {
  const data = await get(`${COURSES_ENDPOINT}/${id}`);
  return data as Course;
};

export const createCourse = async (body: unknown): Promise<Course> => {
  const data = await post(COURSES_ENDPOINT, body);
  return data as Course;
};

export const updateCourse = async (
  id: string,
  body: unknown
): Promise<Course> => {
  const data = await put(`${COURSES_ENDPOINT}/${id}`, body);
  return data as Course;
};

export const deleteCourse = async (id: string) => {
  const data = await del(`${COURSES_ENDPOINT}/${id}`);
  return data;
};
