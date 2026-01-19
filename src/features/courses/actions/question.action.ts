'use server';

import { revalidatePath } from 'next/cache';
import { createQnaQuestion } from '@/services/course.service';
import { QuestionFormData } from '@/features/courses/types';
import { isBackendError } from '@/shared/types/types';
import { mapQuestionError } from '@/features/courses/utils/questionErrorMapper';

export const questionAction = async (
  courseId: number,
  lessonId: number,
  prevState: ActionState<QuestionFormData>,
  formData: FormData,
): Promise<ActionState<QuestionFormData>> => {
  const title = formData.get('questionTitle') as string;
  const content = formData.get('questionContent') as string;

  if (!title.trim() || !content.trim()) {
    return {
      data: {
        title,
        content,
      },
      success: false,
      message: '제목과 내용 모두 입력하세요',
    };
  }
  const payload = {
    title,
    content,
  };

  try {
    await createQnaQuestion(courseId, lessonId, payload);
    revalidatePath(`/courses/${courseId}/learn`, 'page');
    return {
      success: true,
      message: '등록을 성공했습니다.',
    };
  } catch (error) {
    // 백엔드 에러 코드 기반으로 매핑
    if (isBackendError(error)) {
      return mapQuestionError(error);
    }
    // 백엔드 에러 코드에서 잡지 못한 에러
    return {
      success: false,
      message: '알 수 없는 에러입니다.',
    };
  }
};
