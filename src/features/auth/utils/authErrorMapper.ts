import { BackendError, ActionState } from "@/shared/types/types";

export const mapAuthError = (err: BackendError): ActionState => {
  switch (err.code) {
    //errors 객체로 반환 (입력란 아래)
    case "V-0001":
      return {
        success: false,
        errors: {
          email: err.message ?? "이메일은 필수 입력 값입니다.",
        },
      };
    case "V-0002":
      return {
        success: false,
        errors: {
          password: err.message ?? "비밀번호는 필수 입력 값입니다.",
        },
      };
    case "V-0003":
      return {
        success: false,
        errors: {
          name: err.message ?? "이름은 필수 입력 값입니다.",
        },
      };
    case "V-0004":
      return {
        success: false,
        errors: {
          role: err.message ?? "권한(Role)은 필수 입력 값입니다.",
        },
      };
    case "US-0010":
      return {
        success: false,
        errors: {
          email: err.message ?? "이메일 형식이 올바르지 않습니다.",
        },
      };
    case "US-0006":
      return {
        success: false,
        errors: {
          name: err.message ?? "특수문자는 공백만 사용할 수 있습니다.",
        },
      };
    case "US-0007":
      return {
        success: false,
        errors: {
          name: err.message ?? "문자열이 너무 깁니다. 다시 입력해 주세요.",
        },
      };
    case "US-0015":
      return {
        success: false,
        errors: {
          name: err.message ?? "이름은 완성된 한글 문자만 입력할 수 있습니다.",
        },
      };

    //message로 반환 (모달)
    case "US-0001":
    case "US-0002":
      return {
        success: false,
        message: err.message ?? "아이디/비밀번호가 유효하지 않습니다.",
      };
    case "US-0003":
      return {
        success: false,
        message:
          err.message ?? "휴면 계정입니다. 이메일 인증을 통해 활성화 해주세요.",
      };
    case "US-0005":
      return {
        success: false,
        message:
          err.message ??
          "닉네임 생성에 실패했습니다. 잠시 후 다시 시도해주세요.",
      };
    case "US-0008":
      return {
        success: false,
        message: err.message ?? "공백은 입력될 수 없습니다.",
      };
    case "US-0009":
      return {
        success: false,
        message: err.message ?? "중복된 닉네임 입니다. 다시 입력해 주세요.",
      };
    case "US-0011":
      return {
        success: false,
        message:
          err.message ??
          "비밀번호는 이전과 같은 비밀번호로 변경할 수 없습니다.",
      };
    case "US-0012":
      return {
        success: false,
        message: err.message ?? "닉네임은 이전과 같습니다. 다시 입력해 주세요.",
      };
    case "US-0013":
      return {
        success: false,
        message: err.message ?? "해당 유저는 휴면 또는 삭제 되었습니다.",
      };
    case "GB-0001":
      return {
        success: false,
        message:
          err.message ??
          "예기치 않은 에러가 발생했습니다. 문의팀에 문의를 남겨주세요.",
      };
    case "TK-0002":
      return {
        success: false,
        message: err.message ?? "만료된 토큰입니다.",
      };
    case "TK-0003":
      return {
        success: false,
        message:
          err.message ??
          "리프레시 토큰을 찾을 수 없습니다. 확인 후 다시 시도해주세요.",
      };
    case "TK-0004":
      return {
        success: false,
        message: err.message ?? "토큰이 존재하지 않습니다.",
      };
    default:
      return {
        success: false,
        message: err.message ?? "로그인에 실패했습니다.",
      };
  }
};
