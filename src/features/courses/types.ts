export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Lesson {
  title: string;
  seq: number;
  resourceUrl: string | null;
}
export interface Chapter {
  chapterTitle: string;
  seq: number;
  lessons: Lesson[];
}
export interface Course {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  categoryId: string;
  description: string;
  difficulty: Difficulty;
  price: number;
  status: "published" | "archived";
  summary: string;
  coverImageUrl: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  likeCount: number;
  availableDays: number;
  contents: Chapter[];
}

export interface Category {
  id: string;
  name: string;
  parentId: number | null;
  slug: string;
}
