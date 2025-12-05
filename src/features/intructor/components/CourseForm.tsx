import { CourseFormData } from "../types";
import "./CourseForm.css";

type CourseFormMode = "create" | "edit";
interface CourseFormProps {
  mode?: CourseFormMode;
  initialFormData?: CourseFormData;
}

export default function CourseForm({
  mode = "create",
  initialFormData = {
    title: "",
    instructorId: "",
    instructorName: "",
    category: "",
    level: "",
    price: 0,
    thumbnailUrl: "",
    summary: "",
    content: "",
  },
}: CourseFormProps) {
  return (
    <form className="course-form">
      <div className="course-form__group course-form__group--inline">
        <label className="course-form__field">
          <span className="course-form__label">강좌명</span>
          <input
            name="title"
            value={initialFormData.title}
            className="course-form__input"
            type="text"
            placeholder="강좌 제목을 입력해주세요."
          />
        </label>
      </div>

      <div className="course-form__group course-form__group--grid">
        <label className="course-form__field">
          <span className="course-form__label">카테고리</span>
          <select
            name="category"
            value={initialFormData.category}
            className="course-form__select"
          >
            <option value="" disabled>
              카테고리 선택
            </option>
            {/* {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))} */}
          </select>
        </label>

        <label className="course-form__field">
          <span className="course-form__label">난이도</span>
          <select
            name="level"
            value={initialFormData.level}
            className="course-form__select"
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="beginner">초급</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
        </label>

        <label className="course-form__field">
          <span className="course-form__label">가격 (원)</span>
          <input
            name="price"
            value={initialFormData.price}
            className="course-form__input"
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
          />
        </label>
      </div>

      <div className="course-form__group">
        <span className="course-form__label">썸네일 이미지</span>
        <div className="course-form__thumbnail">
          {initialFormData.thumbnailUrl ? (
            <img
              src={initialFormData.thumbnailUrl}
              className="course-form__thumbnail-preview"
            />
          ) : (
            <div className="course-form__thumbnail-preview">미리보기</div>
          )}

          <input
            name="thumbnailUrl"
            id="thumbnail-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
          />
          <label
            htmlFor="thumbnail-upload"
            className="course-form__thumbnail-button"
          >
            파일 업로드
          </label>
          <p className="course-form__thumbnail-hint">PNG, JPG 최대 1MB.</p>
        </div>
      </div>

      <div className="course-form__group">
        <label className="course-form__field">
          <span className="course-form__label">강좌 요약</span>
          <textarea
            name="summary"
            value={initialFormData.summary}
            className="course-form__textarea"
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
          />
        </label>
      </div>

      <div className="course-form__group">
        <label className="course-form__field">
          <span className="course-form__label">강좌 내용</span>
          <textarea
            name="content"
            value={initialFormData.content}
            className="course-form__textarea"
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
          />
        </label>
      </div>

      <div className="course-form__actions">
        <button
          className="course-form__action-button course-form__action-button--cancel"
          type="reset"
        >
          초기화
        </button>
        <button
          className="course-form__action-button course-form__action-button--submit"
          type="submit"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
