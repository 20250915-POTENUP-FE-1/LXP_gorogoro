import "./SignupForm.css";

function SignupForm() {
  return (
    <form className="signup-form">
      <label className="signup-form__field">
        <span className="signup-form__label">이름</span>
        <input
          className="signup-form__input"
          type="text"
          placeholder="이름을 입력하세요"
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">이메일</span>
        <input
          className="signup-form__input"
          type="email"
          placeholder="hello@example.com"
        />
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호</span>
        <div className="signup-form__password">
          <input
            className="signup-form__input signup-form__input--password"
            type="password"
            placeholder="8자 이상 입력"
          />
          <button className="signup-form__password-button" type="button">
            <span className="material-symbols-outlined">visibility_off</span>
          </button>
        </div>
      </label>
      <label className="signup-form__field">
        <span className="signup-form__label">비밀번호 확인</span>
        <div className="signup-form__password">
          <input
            className="signup-form__input signup-form__input--password"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
          />
          <button className="signup-form__password-button" type="button">
            <span className="material-symbols-outlined">visibility_off</span>
          </button>
        </div>
      </label>
      <fieldset className="signup-form__fieldset">
        <legend className="signup-form__legend">회원 유형 선택</legend>
        <div className="signup-form__user-types">
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="user_type"
              defaultChecked
            />
            <span className="material-symbols-outlined signup-form__user-type-icon">
              school
            </span>
            <span className="signup-form__user-type-label">학생</span>
          </label>
          <label className="signup-form__user-type">
            <input
              className="signup-form__radio"
              type="radio"
              name="user_type"
            />
            <span className="material-symbols-outlined signup-form__user-type-icon">
              co_present
            </span>
            <span className="signup-form__user-type-label">강사</span>
          </label>
        </div>
      </fieldset>
      <button className="signup-form__submit" type="button">
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
