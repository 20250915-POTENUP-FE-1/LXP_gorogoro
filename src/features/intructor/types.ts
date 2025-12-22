import { Course, Difficulty, Chapter } from "../courses/types";

// 강사가 생성한 강좌 목록 조회용 타입 (추가 통계 필드 포함)
export interface InstructorCourse {
  courseId: string;
  title: string;
  coverImageUrl: string;
  price: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "published" | "archived";
  rating: number;
  reviewCount: number;
  studentCount: number;
  likeCount: number;
}

// 강좌 생성/수정 요청용 타입 (categoryId 사용)
export interface CourseFormRequest {
  title: string;
  categoryId: string; // 폼에서는 ID를 선택
  difficulty: Difficulty;
  price: number;
  coverImageUrl: string;
  summary: string;
  description: string;
  contents: Chapter[];
  availableDays: number;
}

export type CourseFormResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
