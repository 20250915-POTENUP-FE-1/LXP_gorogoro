export interface EnrolledCourse {
  enrollmentId: string; // 수강 ID
  courseId: string; // 강좌 ID
  courseTitle: string; // 강좌 제목
  coverImageUrl: string; // 커버 이미지
  instructorName: string; // 강사명
  categoryName: string; // 카테고리명
  progress: number; // 진행률 (0-100)
  totalLessons: number; // 전체 레슨 수
  completedLessons: number; // 완료한 레슨 수
  lastAccessedAt: string; // 마지막 접속 시간 (ISO string)
  enrolledAt: string; // 수강 시작일 (ISO string)
  expiresAt?: string; // 만료일 (ISO string, optional)
}

// 내 수강 목록 - 성훈님이 미리 만들어 놓은거
export interface MyEnrollmentsResponse {
  contents: EnrolledCourse[];
}
