export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type TabKey = 'description' | 'curriculum' | 'review' | 'request';

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}
export interface SubCategory {
  id: number;
  name: string;
  parentId: number;
}

/** GET /api/categories (카테고리 조회) 응답*/
export interface CategoriesResponse {
  contents: Category[];
}

export interface Course {
  courseId: number;
  title: string;
  price: number;
  name: string;
  coverImageUrl: string;
}

/** GET /api/courses (강좌 목록 조회) 응답*/
export interface CoursesResponse {
  contents: Course[];
}

/** GET /api/courses/{id} (강좌 상세) 응답 DTO(Data Transfer Object) */
export interface CourseDetailResponse {
  courseId: number;
  title: string;
  summary: string;
  description: string;
  price: number;
  accessDays: number;
  categoryDetail: CategoryDetailDto;
  instructorName: string;
  instructorId: number;
  coverImageUrl: string;
  difficulty: Difficulty;
  chapters: ChapterDto[];
}

export interface CategoryDetailDto {
  categoryId: number;
  name: string;
  subCategoryDetailDto: SubCategoryDetailDto;
}

export interface SubCategoryDetailDto {
  subCategoryId: number;
  name: string;
}

export interface ChapterDto {
  chapterId: number;
  title: string;
  lessons: LessonDto[];
}

export interface LessonDto {
  lessonId: number;
  title: string;
  resourceUrl: string;
}
//MOCK DATA TYPE
export interface Reviews {
  reviews: ReviewDto[];
}
export interface ReviewDto {
  id: number;
  userName: string;
  rating: number;
  createdAt: string;
  content: string;
}
export interface Qna {
  qna: QnaDto[];
}
export type QnaStatus = 'answered' | 'pending';
export interface QnaDto {
  id: number;
  title: string;
  status: QnaStatus;
  userName: string;
  createdAt: string;
  content: string;
  answer?: string;
  answeredAt?: string;
}
/** DELETE /api/courses/{courseId}/chapters 요청 바디 */
export interface DeleteChaptersRequest {
  chapterIds: number[];
}

/** DELETE /api/courses/{courseId}/chapters/{chapterId}/lessons 요청 바디 */
export interface DeleteLessonsRequest {
  lessonIds: number[];
}

// 학습용 상세 조회 (수강자 전용 - resourceUrl 포함) - 성훈님이 미리 만들어 놓은거
export interface CourseLearn extends Course {
  progress?: number; // 진행률 (0-100)
  lastChapterSeq?: number; // 마지막 학습 챕터
  lastLessonSeq?: number; // 마지막 학습 레슨
}
