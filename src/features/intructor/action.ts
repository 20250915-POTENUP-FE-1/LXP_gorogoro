"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createCourse, deleteCourse } from "@/services/course.service";
import { CourseFormData } from "./types";
import { Chapter, Difficulty } from "../courses/types";

type ActionState = {
  success: boolean;
  message: string;
  // errors는 폼 필드 유효성 검사 오류를 저장하는 데 사용됩니다.
  // 예를 들어, { title: "제목은 필수입니다." } 와 같이 필드 이름과 오류 메시지를 매핑합니다.
  // Record<string, string>은 키(필드 이름)와 값(오류 메시지)이 모두 문자열인 객체를 의미합니다.
  errors?: Record<string, string>;
};

export const addCourseAction = async (
  prevState: ActionState,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as unknown as number;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as Difficulty;
  const contents = formData.get("contents") as unknown as Chapter[];
  const availableDays = formData.get("availableDays") as unknown as number;

// 유효성 검사 로직
    if (!title.trim()) return "강좌명을 입력하세요.";
    if (!categoryId) return "카테고리를 선택하세요.";
    if (!difficulty) return "난이도를 선택하세요.";

    if (price <= 0) {
      return "가격은 0원보다 크게 입력하세요.";
    }

    if (price >= 1000000) {
      return "가격은 100만원 이상 설정할 수 없습니다.";
    }

    if (!summary.trim()) return "강좌 요약을 입력하세요.";
    if (!description.trim()) return "강좌 내용을 입력하세요.";

  const newCourse: CourseFormData = {
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
    return {
      success: true,
      message: "강좌가 성공적으로 추가되었습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "강좌 추가 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/intructor/courses");
  redirect("/intructor/courses");
};

export const deleteCourseAction = async (id: string) => {
  await deleteCourse(id);
  revalidatePath("/intructor/courses");
};
