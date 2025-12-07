export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
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
  level: Level;
  price: number;
  summary: string;
  coverImageUrl: string;
  contents: Chapter[];
}

export interface Category {
  id: string;
  name: string;
}
