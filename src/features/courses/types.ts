export type Difficulty = 'INTERMEDIATE' | 'BASIC' | 'PROFESSIONAL';
export type TabKey = 'description' | 'curriculum' | 'review' | 'request';
export type QnaStatus = 'OPENED' | 'ANSWERED' | 'DELETED';

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

/** GET /api/courses (강좌 목록 조회) 응답*/
export interface CoursesResponse {
  contents: Course[];
}

export interface CourseCategoryDto {
  id: number;
  name: string;
  parent: CourseSubCategoryDto;
}

export interface CourseSubCategoryDto {
  id: number;
  name: string;
}

export interface Course {
  courseId: number;
  title: string;
  price: number;
  name: string;
  coverImageUrl: string;
  category: CourseCategoryDto;
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

/** DELETE /api/courses/{courseId}/chapters 요청 바디 */
export interface DeleteChaptersRequest {
  chapterIds: number[];
}

/** DELETE /api/courses/{courseId}/chapters/{chapterId}/lessons 요청 바디 */
export interface DeleteLessonsRequest {
  lessonIds: number[];
}

/** GET /api/courses/{courseId}/reviews 응답 */
export interface ReviewItemDto {
  reviewId: number;
  courseId: number;
  userId: number;
  userNickname: string;
  comment: string;
  title: string;
  rating: number;
  createdAt: string;
}

export interface ReviewListResponse {
  reviews: ReviewItemDto[];
}

/** POST /api/courses/{courseId}/reviews 요청 바디 */
/** PUT /api/courses/{ courseId }/reviews/{ reviewId } 요청 바디 */
export interface ReviewRequest {
  title: string;
  comment: string;
  rating: number;
}

/**
 * GET /api/courses/{courseId}/lessons/{lessonId}/qna
 * 레슨 단위 root 질문 목록 조회 응답
 */
export type LessonQnaItemDto = {
  questionId: number;
  courseId: number;
  lessonId: number;
  title: string;
  authorId: number;
  authorNickname: string;
  status: QnaStatus;
  replyCount: number;
  lastActivityAt: string; // ISO-8601
};

export type LessonQnaListResponse = {
  questions: LessonQnaItemDto[];
};

/**
 * GET /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/thread
 * 스레드 상세 조회 응답
 */
export type QnaThreadQuestionDto = {
  questionId: number;
  isRoot: boolean;
  title: string | null; // 답변은 null
  content: string;
  authorId: number;
  authorNickname: string;
  createdAt: string; // ISO-8601
};

export type QnaThreadResponse = {
  threadId: string; // UUID
  courseId: number;
  lessonId: number;
  instructorId: number;
  status: QnaStatus;
  lastActivityAt: string; // ISO-8601
  questions: QnaThreadQuestionDto[]; // createdAt ASC
};

/**
 * POST /api/courses/{courseId}/lessons/{lessonId}/qna
 * 질문 생성 요청
 */
export type CreateQnaQuestionRequest = {
  title: string;
  content: string;
};

export type QuestionFormData = {
  title: string;
  content: string;
};
/**
 * POST /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}/replies
 * 답변 추가 요청
 */
export type CreateQnaReplyRequest = {
  content: string;
};

export type ReplyFormData = {
  content: string;
};

/**
 * PATCH /api/courses/{courseId}/lessons/{lessonId}/qna/{questionId}
 * 질문/답변 수정 요청
 * - 답변인 경우 title은 무시됨(서버)
 */
export type UpdateQnaRequest = {
  title?: string;
  content?: string;
};

/**
 * GET /api/qna/instructors/unanswered
 * 강사 미답변 질문 조회 응답
 */
export type UnansweredQnaItemDto = {
  questionId: number;
  courseId: number;
  lessonId: number;
  title: string;
  authorId: number;
  lastActivityAt: string; // ISO-8601
};

export type UnansweredQnaResponse = {
  questions: UnansweredQnaItemDto[];
};

/**
 * POST /api/enrollments
 * 수강 신청
 */
export type AddEnrollRequest = {
  courseId: number;
};

/**
 * GET /api/enrollments
 * 내 수강 목록 조회
 */
export type EnrollResponse = {
  contents: EnrollCourse[];
};

export type EnrollCourse = {
  courseId: number;
  courseTitle: string;
  instructorName: string;
  coverImage: string;
};
