export const validateRegistForm = ({
  name,
  email,
  password,
  confirmPassword,
}: any) => {
  const errors: Record<string, string> = {};
  const nameRegex = /^[가-힣]{2,7}$/; // 완성형 한글 2~7자
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/; // 영문 + 숫자 + 특수문자 포함, 8자 이상
  const emailRegex =
    /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // 기본 이메일 형식 + .. 금지
  if (!name) {
    errors.name = "이름을 입력해주세요.";
  } else if (!nameRegex.test(name)) {
    errors.name = "이름은 2~7자의 완성된 한글만 입력할 수 있습니다.";
  }
  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }
  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return { success: true };
};

export const validateLoginForm = ({ email, password }: any) => {
  const errors: Record<string, string> = {};
  if (!email) {
    errors.email = "이메일을 입력하세요";
  }
  if (!password) {
    errors.password = "비밀번호를 입력하세요";
  } else if (password.length < 8) {
    errors.password = "비밀번호는 8자 이상입니다.";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return { success: true };
};
