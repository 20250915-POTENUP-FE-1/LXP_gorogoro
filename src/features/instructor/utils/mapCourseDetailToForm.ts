import { CourseDetailResponse } from '@/features/courses/types';
import { CourseFormRequest } from '@/features/instructor/types';

// CourseDetailResponse -> CourseFormRequest 로 매핑
const mapCourseDetailForm = (detail: CourseDetailResponse): CourseFormRequest => {
  return {
    title: detail.title,
    summary: detail.summary,
    description: detail.description,
    categoryId:
      detail.categoryDetail.subCategoryDetailDto.subCategoryId ?? detail.categoryDetail.categoryId,
    price: detail.price,
    coverImageUrl: detail.coverImageUrl,
    courseDifficulty: detail.difficulty,
    contents: (detail.chapters ?? []).map((chapter, idx) => ({
      chapterId: chapter.chapterId,
      title: chapter.title,
      lessons: (chapter.lessons ?? []).map((lesson, idx) => ({
        lessonId: lesson.lessonId,
        title: lesson.title,
        resourceUrl: lesson.resourceUrl,
      })),
    })),
    accessDays: detail.accessDays,
  };
};
export default mapCourseDetailForm;
