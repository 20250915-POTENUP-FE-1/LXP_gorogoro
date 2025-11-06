import "./CourseCreateForm.css";

function CourseCreateForm() {
  return (
    <form className="course-edit-form">
      <div className="course-edit-form__group course-edit-form__group--inline">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌명</span>
          <input
            className="course-edit-form__input"
            type="text"
            placeholder="강좌 제목을 입력해주세요."
          />
        </label>
      </div>

      <div className="course-edit-form__group course-edit-form__group--grid">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">카테고리</span>
          <select
            className="course-edit-form__select"
            defaultValue="프로그래밍"
          >
            <option>프로그래밍</option>
            <option>데이터 사이언스</option>
            <option>디자인</option>
          </select>
        </label>

        <label className="course-edit-form__field">
          <span className="course-edit-form__label">레벨</span>
          <select className="course-edit-form__select" defaultValue="초급">
            <option>입문</option>
            <option>초급</option>
            <option>중급</option>
            <option>고급</option>
          </select>
        </label>

        <label className="course-edit-form__field">
          <span className="course-edit-form__label">가격 (원)</span>
          <input
            className="course-edit-form__input"
            type="text"
            placeholder="예: 55000"
          />
        </label>
      </div>

      <div className="course-edit-form__group">
        <span className="course-edit-form__label">썸네일 이미지</span>
        <div className="course-edit-form__thumbnail">
          <div className="course-edit-form__thumbnail-preview">미리보기</div>
          <button className="course-edit-form__thumbnail-button" type="button">
            파일 업로드
          </button>
          <p className="course-edit-form__thumbnail-hint">
            PNG, JPG, GIF up to 10MB.
          </p>
        </div>
      </div>

      <div className="course-edit-form__group">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌 요약</span>
          <textarea
            className="course-edit-form__textarea"
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
          />
        </label>
      </div>

      <div className="course-edit-form__group">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌 내용</span>
          <textarea
            className="course-edit-form__textarea"
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
          />
        </label>
      </div>

      <div className="course-edit-form__actions">
        <button
          className="course-edit-form__action-button course-edit-form__action-button--cancel"
          type="button"
        >
          취소
        </button>
        <button
          className="course-edit-form__action-button course-edit-form__action-button--submit"
          type="button"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}

export default CourseCreateForm;
