'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createCourse, deleteCourse, updateCourse } from '@/services/course.service';
import { CourseFormRequest } from './types';
import { Difficulty } from '../courses/types';
import { BackendError } from '@/shared/types/types';
import { handleBackendError } from '@/shared/utils/errorHandler';

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const getCourseDataFromFormData = (formData: FormData): CourseFormRequest => {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const categoryId = formData.get('categoryId') as string;
  const price = formData.get('price') as unknown as number;
  const coverImageUrl = formData.get('coverImageUrl') as string;
  const description = formData.get('description') as string;
  const difficulty = formData.get('difficulty') as Difficulty;
  const availableDays = formData.get('availableDays') as unknown as number;

  // FormData에서 contents 배열 재구성
  const contents: Chapter[] = [];
  let chapterIndex = 0;
  while (formData.has(`contents[${chapterIndex}][chapterTitle]`)) {
    const chapterTitle = formData.get(`contents[${chapterIndex}][chapterTitle]`) as string;

    const lessons: { title: string; seq: number; resourceUrl: string }[] = [];
    let lessonIndex = 0;
    while (formData.has(`contents[${chapterIndex}][lessons][${lessonIndex}][title]`)) {
      lessons.push({
        title: formData.get(`contents[${chapterIndex}][lessons][${lessonIndex}][title]`) as string,
        seq: lessonIndex + 1,
        resourceUrl: formData.get(
          `contents[${chapterIndex}][lessons][${lessonIndex}][resourceUrl]`,
        ) as string,
      });
      lessonIndex++;
    }

    contents.push({ chapterTitle, seq: chapterIndex + 1, lessons });
    chapterIndex++;
  }

  return {
    title,
    summary,
    categoryId,
    price,
    coverImageUrl,
    description,
    difficulty,
    contents,
    availableDays,
  };
};

const validateCourseData = (data: CourseFormRequest) => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = '강좌명을 입력하세요.';
  }
  if (!data.categoryId) {
    errors.categoryId = '카테고리를 선택하세요.';
  }
  if (!data.courseDifficulty) {
    errors.difficulty = '난이도를 선택하세요.';
  }
  if (data.price <= 0) {
    errors.price = '가격은 0원보다 크게 입력하세요.';
  } else if (data.price >= 1000000) {
    errors.price = '가격은 100만원 이상 설정할 수 없습니다.';
  }
  if (!data.summary.trim()) {
    errors.summary = '강좌 요약을 입력하세요.';
  }
  if (!data.description.trim()) {
    errors.description = '강좌 내용을 입력하세요.';
  }
  return errors;
};

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
      message: '입력 값을 확인해주세요.',
      errors,
    };
  }

  try {
    await createCourse(newCourse);
  } catch (error) {
    return handleBackendError(error as BackendError);
  }

  revalidatePath('/instructor/courses');
  redirect('/instructor/courses');
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
      message: '입력 값을 확인해주세요.',
      errors,
    };
  }

  try {
    await updateCourse(id, updatedCourse);
  } catch (error) {
    return handleBackendError(error as BackendError);
  }

  revalidatePath('/instructor/courses');
  redirect('/instructor/courses');
};

export const DeleteCourseAction = async (courseId: number) => {
  if (Number.isNaN(courseId)) {
    throw new Error('Invalid course ID.');
  }
  await deleteCourse(courseId);
  revalidatePath('/mypage/instructor/courses');
};
