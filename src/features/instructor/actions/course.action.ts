'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createCourse, deleteCourse, updateCourse } from '@/services/course.service';
import { CourseChapterRequest, CourseFormRequest, CourseLessonRequest } from '../types';
import { Difficulty } from '../../courses/types';
import { BackendError } from '@/shared/types/types';
import { handleBackendError } from '@/shared/utils/errorHandler';
import { withRefreshRetry } from '@/shared/lib/withRefreshRetry';

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const getCourseDataFromFormData = (formData: FormData): CourseFormRequest => {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const description = formData.get('description') as string;
  const categoryId = formData.get('categoryId') as string;
  const price = formData.get('price') as unknown as number;
  const coverImageUrl = formData.get('coverImageUrl') as string;
  const courseDifficulty = formData.get('courseDifficulty') as Difficulty;
  const accessDays = formData.get('accessDays') as unknown as number;

  // FormData에서 contents 배열 재구성
  const contents: CourseChapterRequest[] = [];
  for (let chapterIdx = 0; ; chapterIdx++) {
    const chapterId = formData.get(`contents[${chapterIdx}][chapterId]`) ?? undefined;
    const chapterTitle = formData.get(`contents[${chapterIdx}][title]`);
    if (chapterTitle === null) break; // 더 이상 챕터 input이 없으면 종료

    const lessons: CourseLessonRequest[] = [];
    for (let lessonIdx = 0; ; lessonIdx++) {
      const lessonId =
        formData.get(`contents[${chapterIdx}][lessons][${lessonIdx}][lessonId]`) ?? undefined;
      const lessonTitle = formData.get(`contents[${chapterIdx}][lessons][${lessonIdx}][title]`);
      if (lessonTitle === null) break;

      lessons.push({
        lessonId: lessonId ? Number(lessonId) : undefined,
        title: String(lessonTitle),
        seq: lessonIdx,
        resourceUrl: String(
          formData.get(`contents[${chapterIdx}][lessons][${lessonIdx}][resourceUrl]`) ?? '',
        ),
      });
    }

    contents.push({
      chapterId: chapterId ? Number(chapterId) : undefined,
      title: String(chapterTitle),
      seq: chapterIdx,
      lessons,
    });
  }

  return {
    title,
    summary,
    description,
    categoryId: Number(categoryId),
    price,
    coverImageUrl,
    courseDifficulty,
    contents,
    accessDays,
  };
};

const validateCourseData = (data: CourseFormRequest) => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) errors.title = '강좌명을 입력하세요.';
  if (!data.categoryId) errors.categoryId = '카테고리를 선택하세요.';
  if (!data.courseDifficulty) errors.difficulty = '난이도를 선택하세요.';
  if (data.price <= 0) errors.price = '가격은 0원보다 크게 입력하세요.';
  else if (data.price >= 1000000) errors.price = '가격은 100만원 이상 설정할 수 없습니다.';
  if (!data.summary.trim()) errors.summary = '강좌 요약을 입력하세요.';
  if (!data.description.trim()) errors.description = '강좌 내용을 입력하세요.';

  if (!data.contents || data.contents.length === 0) {
    errors.contents = '챕터를 최소 1개 이상 추가하세요.';
    return errors;
  }

  data.contents.forEach((chapter, chapterIdx) => {
    const chapterKey = `contents[${chapterIdx}][title]`;
    if (!chapter.title?.trim()) {
      errors[chapterKey] = '챕터 제목을 입력하세요.';
    }

    if (!chapter.lessons || chapter.lessons.length === 0) {
      errors[`contents[${chapterIdx}][lessons]`] = '레슨을 최소 1개 이상 추가하세요.';
      return;
    }

    chapter.lessons.forEach((lesson, lessonIdx) => {
      const lessonTitleKey = `contents[${chapterIdx}][lessons][${lessonIdx}][title]`;
      const lessonUrlKey = `contents[${chapterIdx}][lessons][${lessonIdx}][resourceUrl]`;

      if (!lesson.title?.trim()) {
        errors[lessonTitleKey] = '레슨 제목을 입력하세요.';
      }

      // URL을 필수로 할지 정책에 따라
      if (!lesson.resourceUrl?.trim()) {
        errors[lessonUrlKey] = '영상/자료 URL을 입력하세요.';
      }
      // 혹은 URL 형식 검사까지
      // else if (!isValidUrl(lesson.resourceUrl)) errors[lessonUrlKey] = 'URL 형식이 올바르지 않습니다.';
    });
  });

  return errors;
};

export type CourseFormResponse = ActionState;
export const CreateCourseAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<CourseFormResponse> => {
  const newCourse = getCourseDataFromFormData(formData);

  // 유효성 검사 로직
  const errors = validateCourseData(newCourse);
  if (Object.keys(errors).length > 0) {
    // 모든 유효성 검사 후 오류가 하나라도 있으면 한번에 반환
    return {
      success: false,
      message: '강의 등록에 실패하셨습니다.',
      errors,
    };
  }

  try {
    await withRefreshRetry(() => createCourse(newCourse));
  } catch (error) {
    return handleBackendError(error as BackendError);
  }

  revalidatePath('/mypage/instructor/courses');
  redirect('/mypage/instructor/courses');
};

export const UpdateCourseAction = async (
  id: string,
  prevState: ActionState,
  formData: FormData,
): Promise<CourseFormResponse> => {
  const updatedCourse = getCourseDataFromFormData(formData);

  // 유효성 검사 로직
  const errors = validateCourseData(updatedCourse);
  if (Object.keys(errors).length > 0) {
    // 모든 유효성 검사 후 오류가 하나라도 있으면 한번에 반환
    return {
      success: false,
      message: '강의 수정에 실패하셨습니다.',
      errors,
    };
  }

  try {
    await withRefreshRetry(() => updateCourse(Number(id), updatedCourse));
  } catch (error) {
    return handleBackendError(error as BackendError);
  }

  revalidatePath('/mypage/instructor/courses');
  redirect('/mypage/instructor/courses');
};

export const DeleteCourseAction = async (courseId: number) => {
  if (Number.isNaN(courseId)) {
    throw new Error('Invalid course ID.');
  }
  await deleteCourse(courseId);
  revalidatePath('/mypage/instructor/courses');
};
