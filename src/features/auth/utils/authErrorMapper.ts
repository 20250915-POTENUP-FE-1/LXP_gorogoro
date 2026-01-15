import { BackendError } from '@/shared/types/types';
import { RegistFormData } from '@/features/auth/types';

export const mapAuthError = (err: BackendError): ActionState<RegistFormData> => {
  switch (err.code) {
    /**
     * errors 객체로 반환 (입력란 아래 에러 메시지 표시)
     * 주로 400 Bad Request 유효성 검증 실패 케이스
     */
    case 'USR-0020': // 값은 비어 있을 수 없습니다.
      return {
        success: false,
        errors: {
          // 어떤 필드가 비어있는지 서버 응답 message나 field 정보가 있다면 활용 가능
          // 여기서는 일반적인 필수값 누락 메시지 처리
          email: err.message ?? '필수 입력 값이 누락되었습니다.',
        },
      };
    case 'USR-0021': // 문자열 길이 초과
      return {
        success: false,
        errors: {
          name: err.message ?? '이름의 길이가 허용 범위를 초과했습니다.',
        },
      };
    case 'USR-0025': // 이름 한글 제한
      return {
        success: false,
        errors: {
          name: err.message ?? '이름은 한글만 입력할 수 있습니다.',
        },
      };
    case 'GLO-0001': // 잘못된 요청 (Validation Fail)
      return {
        success: false,
        errors: {
          email: err.message ?? '입력 정보를 다시 확인해주세요.',
        },
      };

    /**
     * message로 반환 (모달 또는 알림창 표시)
     */
    case 'USR-0002': // 이미 존재하는 사용자 (중복 가입)
      return {
        success: false,
        message: err.message ?? '이미 존재하는 사용자(이메일)입니다.',
      };
    case 'USR-0001': // 사용자를 찾을 수 없음
      return {
        success: false,
        message: err.message ?? '사용자 정보를 찾을 수 없습니다.',
      };
    case 'ATH-0001': // 로그인 실패 (인증 오류)
      return {
        success: false,
        message: err.message ?? '이메일 또는 비밀번호가 올바르지 않습니다.',
      };
    case 'ATH-0002': // 유효하지 않은 리프레시 토큰
    case 'ATH-0003': // 리프레시 토큰 만료
      return {
        success: false,
        message: err.message ?? '세션이 만료되었습니다. 다시 로그인해주세요.',
      };
    case 'GLO-0002': // 서버 내부 오류
      return {
        success: false,
        message: err.message ?? '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };

    default:
      return {
        success: false,
        message: err.message ?? '요청 처리 중 알 수 없는 에러가 발생했습니다.',
      };
  }
};
