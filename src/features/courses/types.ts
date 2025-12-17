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
  categoryName: string;
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
  parentId?: number | null;
  subCategories?: Category[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface QnA {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  answer?: string;
  answeredAt?: string;
  createdAt: string;
  status: "pending" | "answered";
}

// 일반 상세 조회용 (구매 전 - 커리큘럼은 보이되 resourceUrl은 null)
export interface CourseDetail {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  categoryName: string;
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
  contents: Chapter[]; // ← 커리큘럼 포함 (resourceUrl은 null)
  reviews: Review[];
  qna: QnA[];
}

// 학습용 상세 조회 (수강자 전용 - resourceUrl 포함)
export interface CourseLearn extends Course {
  progress?: number; // 진행률 (0-100)
  lastChapterSeq?: number; // 마지막 학습 챕터
  lastLessonSeq?: number; // 마지막 학습 레슨
}
