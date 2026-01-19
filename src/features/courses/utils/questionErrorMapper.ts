import { BackendError } from '@/shared/types/types';

export const mapQuestionError = (error: BackendError) => {
  // 기본 반환 객체 구조 설정
  const baseError = {
    success: false,
    message: error.message || '요청 처리 중 오류가 발생했습니다.',
    errors: {},
    data: { title: '', content: '' },
  };

  switch (error.code) {
    case 'QNA-0001':
      return {
        ...baseError,
        errors: {
          title: error.message ?? '질문 제목은 필수 입력 항목입니다.',
        },
      };
    case 'QNA-0002':
      return {
        ...baseError,
        errors: {
          content: error.message ?? '질문 내용은 필수 입력 항목입니다.',
        },
      };
    default:
      return baseError;
  }
};
