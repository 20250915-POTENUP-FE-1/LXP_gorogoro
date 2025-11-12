import "./SignupForm.css";

import { db, auth } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const USERS_COLLECTION_NAME = "users";

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const validateSignup = (formData) => {
    if (!formData.displayName) return "이름을 입력하세요.";
    if (!formData.email) return "이메일을 입력하세요.";
    if (!formData.password) return "비밀번호를 입력하세요.";
    if (formData.password.length < 8)
      return "비밀번호는 8자리 이상이어야 합니다.";
    if (!formData.confirmPassword) return "확인 비밀번호를 입력하세요";
    if (formData.password !== formData.confirmPassword)
      return "비밀번호가 일치하지 않습니다.";
    if (!formData.role) return "회원 유형을 선택하세요.";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 가입하기 버튼 클릭 시
  const handleSubmit = async (e) => {
    e.preventDefault();
    // error 상태 초기화
    setError("");

    const errorMsg = validateSignup(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      // Authentication에 새로운 유저 추가 (EMAIL, UID)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Authentication에 추가된 UID
      const uid = userCredential.user.uid;

      // Firestore에 추가할 user 객체 선언
      const newUser = {
        displayName: formData.displayName,
        email: formData.email,
        role: formData.role,
      };

      // Firestore users collection에 추가
      await addUserProfile(uid, newUser);

      navigate("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("이미 사용 중인 이메일입니다.");
          break;
        case "auth/invalid-email":
          setError("유효하지 않은 이메일 형식입니다.");
          break;
        case "auth/weak-password":
          setError("비밀번호가 너무 약합니다.");
          break;
        default:
          setError("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label className="signup-form__field">
        <span className="signup-form__label">이름</span>
        <input
          name="displayName"
          value={formData.displayName}
          className="signup-form__input"
          type="text"
          placeholder="이름을 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">이메일</span>
        <input
          name="email"
          value={formData.email}
          className="signup-form__input"
          type="email"
          placeholder="hello@example.com"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호</span>
        <input
          name="password"
          value={formData.password}
          className="signup-form__input"
          type="password"
          placeholder="8자 이상 입력"
          onChange={handleOnChange}
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호 확인</span>
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          className="signup-form__input"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          onChange={handleOnChange}
        />
      </label>
      <fieldset className="signup-form__fieldset">
        <legend className="signup-form__legend">회원 유형 선택</legend>
        <div className="signup-form__user-types">
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleOnChange}
            />
            <span className="signup-form__user-type-label">학생</span>
          </label>
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="role"
              value="instructor"
              checked={formData.role === "instructor"}
              onChange={handleOnChange}
            />
            <span className="signup-form__user-type-label">강사</span>
          </label>
        </div>
      </fieldset>
      {error && <span className="signup-form__error-message">{error}</span>}
      <button className="signup-form__submit" type="submit">
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
