'use server';

import { createQnaReply } from '@/services/course.service';
import { ReplyFormData } from '@/features/courses/types';
import { isBackendError } from '@/shared/types/types';
import { mapReplyError } from '@/features/courses/utils/replyErrorMapper';

export const replyAction = async (
  courseId: number,
  lessonId: number,
  questionId: number,
  prevState: ActionState<ReplyFormData>,
  formData: FormData,
) => {
  const content = formData.get('content') as string;
  if (!content.trim()) {
    return {
      data: {
        content,
      },
      success: false,
      message: '답글을 입력하세요.',
    };
  }
  const payload = {
    content,
  };
  try {
    await createQnaReply(courseId, lessonId, questionId, payload);
    return {
      success: true,
      message: '등록을 성공했습니다.',
    };
  } catch (error) {
    if (isBackendError(error)) {
      return mapReplyError(error);
    }
  }
  // 백엔드 에러 코드에서 잡지 못한 에러
  return {
    success: false,
    message: '알 수 없는 에러입니다.',
  };
};
