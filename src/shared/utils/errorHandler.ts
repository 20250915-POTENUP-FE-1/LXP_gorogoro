import { BackendError } from "@/shared/types/types";

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

/**
 * BackendError를 ActionState로 변환하는 유틸 함수
 * Server Actions에서 에러 처리 시 사용
 */
export const handleBackendError = (error: BackendError): ActionState => {
  switch (error.status) {
    case 400:
      // 잘못된 요청 (Validation 또는 비즈니스 에러)
      return {
        success: false,
        message: error.message || "입력값을 확인해주세요.",
        errors: {},
      };

    case 401:
      // 인증 실패
      return {
        success: false,
        message: error.message || "로그인이 필요합니다.",
        errors: {},
      };

    case 403:
      // 권한 없음
      return {
        success: false,
        message: error.message || "권한이 없습니다.",
        errors: {},
      };

    case 404:
      // 리소스를 찾을 수 없음
      return {
        success: false,
        message: error.message || "리소스를 찾을 수 없습니다.",
        errors: {},
      };

    case 500:
    default:
      // 서버 에러 또는 알 수 없는 에러
      return {
        success: false,
        message: error.message || "서버 오류가 발생했습니다.",
        errors: {},
      };
  }
};
