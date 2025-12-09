import { Course } from "../courses/types";

export type CourseFormRequest = Omit<
  Course,
  | "id"
  | "instructorId"
  | "instructorName"
  | "status"
  | "rating"
  | "reviewCount"
  | "studentCount"
  | "likeCount"
>;

export type CourseFormResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
