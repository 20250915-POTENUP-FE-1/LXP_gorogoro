"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/services/course.service";
import { CourseFormRequest, CourseFormResponse } from "./types";
import { Chapter, Difficulty } from "../courses/types";

type ActionState = {
  success: boolean;
  message?: string;
  // errors는 폼 필드 유효성 검사 오류를 저장하는 데 사용됩니다.
  // 예를 들어, { title: "제목은 필수입니다." } 와 같이 필드 이름과 오류 메시지를 매핑합니다.
  // Record<string, string>은 키(필드 이름)와 값(오류 메시지)이 모두 문자열인 객체를 의미합니다.
  errors?: Record<string, string>;
};

export const CreateCourseAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<CourseFormResponse> => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as unknown as number;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as Difficulty;
  const availableDays = formData.get("availableDays") as unknown as number;

  // FormData에서 contents 배열 재구성
  const contents: Chapter[] = [];
  let chapterIndex = 0;
  while (formData.has(`contents[${chapterIndex}][chapterTitle]`)) {
    const chapterTitle = formData.get(
      `contents[${chapterIndex}][chapterTitle]`
    ) as string;

    const lessons: { title: string; seq: number; resourceUrl: string }[] = [];
    let lessonIndex = 0;
    while (
      formData.has(`contents[${chapterIndex}][lessons][${lessonIndex}][title]`)
    ) {
      lessons.push({
        title: formData.get(
          `contents[${chapterIndex}][lessons][${lessonIndex}][title]`
        ) as string,
        seq: lessonIndex + 1,
        resourceUrl: formData.get(
          `contents[${chapterIndex}][lessons][${lessonIndex}][resourceUrl]`
        ) as string,
      });
      lessonIndex++;
    }

    contents.push({ chapterTitle, seq: chapterIndex + 1, lessons });
    chapterIndex++;
  }

  // 유효성 검사 로직
  const errors: Record<string, string> = {};

  if (!title.trim()) {
    errors.title = "강좌명을 입력하세요.";
  }
  if (!categoryId) {
    errors.categoryId = "카테고리를 선택하세요.";
  }
  if (!difficulty) {
    errors.difficulty = "난이도를 선택하세요.";
  }
  if (price <= 0) {
    errors.price = "가격은 0원보다 크게 입력하세요.";
  } else if (price >= 1000000) {
    errors.price = "가격은 100만원 이상 설정할 수 없습니다.";
  }
  if (!summary.trim()) {
    errors.summary = "강좌 요약을 입력하세요.";
  }
  if (!description.trim()) {
    errors.description = "강좌 내용을 입력하세요.";
  }
  if (!summary.trim())
    if (Object.keys(errors).length > 0) {
      // 모든 유효성 검사 후 오류가 하나라도 있으면 한번에 반환
      return {
        success: false,
        message: "입력 값을 확인해주세요.",
        errors,
      };
    }

  const newCourse: CourseFormRequest = {
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

  try {
    await createCourse(newCourse);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "게시글 등록에 실패하였습니다.",
      errors: {},
    };
  }

  revalidatePath("/instructor/courses");
  redirect("/instructor/courses");
};

export const UpdateCourseAction = async (
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<CourseFormResponse> => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as unknown as number;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as Difficulty;
  const availableDays = formData.get("availableDays") as unknown as number;

  // FormData에서 contents 배열 재구성
  const contents: Chapter[] = [];
  let chapterIndex = 0;
  while (formData.has(`contents[${chapterIndex}][chapterTitle]`)) {
    const chapterTitle = formData.get(
      `contents[${chapterIndex}][chapterTitle]`
    ) as string;

    const lessons: { title: string; seq: number; resourceUrl: string }[] = [];
    let lessonIndex = 0;
    while (
      formData.has(`contents[${chapterIndex}][lessons][${lessonIndex}][title]`)
    ) {
      lessons.push({
        title: formData.get(
          `contents[${chapterIndex}][lessons][${lessonIndex}][title]`
        ) as string,
        seq: lessonIndex + 1,
        resourceUrl: formData.get(
          `contents[${chapterIndex}][lessons][${lessonIndex}][resourceUrl]`
        ) as string,
      });
      lessonIndex++;
    }

    contents.push({ chapterTitle, seq: chapterIndex + 1, lessons });
    chapterIndex++;
  }

  // 유효성 검사 로직
  const errors: Record<string, string> = {};

  if (!title.trim()) {
    errors.title = "강좌명을 입력하세요.";
  }
  if (!categoryId) {
    errors.categoryId = "카테고리를 선택하세요.";
  }
  if (!difficulty) {
    errors.difficulty = "난이도를 선택하세요.";
  }
  if (price <= 0) {
    errors.price = "가격은 0원보다 크게 입력하세요.";
  } else if (price >= 1000000) {
    errors.price = "가격은 100만원 이상 설정할 수 없습니다.";
  }
  if (!summary.trim()) {
    errors.summary = "강좌 요약을 입력하세요.";
  }
  if (!description.trim()) {
    errors.description = "강좌 내용을 입력하세요.";
  }
  if (!summary.trim())
    if (Object.keys(errors).length > 0) {
      // 모든 유효성 검사 후 오류가 하나라도 있으면 한번에 반환
      return {
        success: false,
        message: "입력 값을 확인해주세요.",
        errors,
      };
    }

  const newCourse: CourseFormRequest = {
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

  try {
    await updateCourse(id, newCourse);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "게시글 수정에 실패하였습니다.",
      errors: {},
    };
  }

  revalidatePath("/instructor/courses");
  redirect("/instructor/courses");
};

export const deleteCourseAction = async (id: string) => {
  await deleteCourse(id);
  revalidatePath("/instructor/courses");
};
