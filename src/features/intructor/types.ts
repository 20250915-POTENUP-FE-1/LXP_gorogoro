import { Course } from "../courses/types";

export type CourseFormData = Omit<Course, "id">;
