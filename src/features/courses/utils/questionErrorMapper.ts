import { BackendError } from '@/shared/types/types';

export const mapQuestionError = (error: BackendError) => {
  switch (error.code) {
    case 'QNA-0001':
      return {
        status: 400,
        success: false,
        errors: {
          title: error.message ?? '질문 제목은 필수 입력 항목입니다.',
        },
      };
    case 'QNA-0002':
      return {
        status: 400,
        success: false,
        errors: {
          content: error.message ?? '질문 내용은 필수 입력 항목입니다.',
        },
      };
  }
};
