import { BackendError } from '@/shared/types/types';

export const mapReplyError = (error: BackendError) => {
  // 기본 반환 객체 구조 설정
  const baseError = {
    success: false,
    message: error.message || '요청 처리 중 오류가 발생했습니다.',
    errors: {},
    data: { content: '' },
  };

  switch (error.code) {
    case 'QNA-0002':
      return {
        ...baseError,
        errors: {
          content: error.message ?? '질문 내용은 필수 입력 항목입니다.',
        },
      };

    case 'QNA-0003': // 답변의 강의 정보가 원본 질문과 일치하지 않습니다.
      return {
        ...baseError,
        message: error.message ?? '답변의 강의 정보가 원본 질문과 일치하지 않습니다.',
      };

    case 'QNA-0004': // 답변에는 답변을 작성할 수 없습니다.
      return {
        ...baseError,
        message: error.message ?? '답변에는 답변을 작성할 수 없습니다.',
      };

    case 'QNA-0007': // 질문에 답변할 권한이 없습니다. (403)
      return {
        ...baseError,
        message: error.message ?? '질문에 답변할 권한이 없습니다.',
      };

    case 'QNA-0008': // 질문을 찾을 수 없습니다. (404)
      return {
        ...baseError,
        message: error.message ?? '질문을 찾을 수 없습니다.',
      };

    default:
      return baseError;
  }
};
