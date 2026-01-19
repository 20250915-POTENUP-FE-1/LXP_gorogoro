import { Difficulty } from '../courses/types';

export interface InstructorCourse {
  courseId: number;
  title: string;
  coverImageUrl: string;
  price: number;
  difficulty: Difficulty;
}

/** GET /api/instructor/courses 응답 */
export interface InstructorCoursesResponse {
  contents: InstructorCourse[];
}

export interface CourseChapterRequest {
  chapterId?: number;
  title: string;
  seq?: number;
  lessons: CourseLessonRequest[];
}

export interface CourseLessonRequest {
  lessonId?: number;
  title: string;
  seq?: number;
  resourceUrl?: string | null;
}

/** POST /api/courses, PUT /api/courses/{courseId} 요청 바디 */
export interface CourseFormRequest {
  title: string;
  summary: string;
  description: string;
  categoryId: number;
  price: number;
  coverImageUrl: string;
  courseDifficulty: Difficulty;
  contents: CourseChapterRequest[];
  accessDays: number;
}
