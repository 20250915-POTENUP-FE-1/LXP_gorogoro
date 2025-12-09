import { Course } from "../courses/types";

export type CourseFormData = Omit<
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
