import "./LoginForm.css";

import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 1. formData, error에 대한 상태 변수 설정
 * 2. 폼 제출 이벤트에, handleSubmit 함수를 발동시킨다 (onSubmit)
 * 2-1. firebase/auth의 signInWithEmailAndPassword 함수로 새로운 user를 생성한다.
 * 2-2. 에러 발생할 경우, setError를 통해 error.code에 따른 error 메시지를 출력한다.
 * 2-3. 로그인 성공할 경우, / 메인페이지로 navigate 시킨다.
 */

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validateLogin = (formData) => {
    if (!formData.email) return "이메일을 입력하세요.";
    if (!formData.password) return "비밀번호를 입력하세요.";
    if (formData.password.length < 8)
      return "비밀번호는 8자리 이상이어야 합니다.";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errorMsg = validateLogin(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userId = userCredential.user.uid;
      console.log("로그인 성공", userId);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("등록되지 않은 이메일입니다.");
          break;
        case "auth/wrong-password":
          setError("비밀번호가 올바르지 않습니다.");
          break;
        default:
          setError("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label className="login-form__field">
        <span className="login-form__label">이메일</span>
        <input
          name="email"
          value={formData.email}
          className="login-form__input"
          type="email"
          placeholder="Enter your email"
          onChange={handleOnChange}
        />
      </label>
      <label className="login-form__field">
        <span className="login-form__label">비밀번호</span>
        <input
          name="password"
          value={formData.password}
          className="login-form__input"
          type="password"
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
      </label>
      {error && <span className="login-form__error-message">{error}</span>}
      <button className="login-form__submit" type="submit">
        로그인
      </button>
    </form>
  );
}

export default LoginForm;
