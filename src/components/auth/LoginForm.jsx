import "./LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../store/login";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const result = await dispatch(login(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
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
