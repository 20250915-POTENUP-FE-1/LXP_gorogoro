import "./CourseCreateForm.css";

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { createCourse } from "../../services/courseService";

function CourseCreateForm() {
  const { categories } = useOutletContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    // 추후 currentUser 값으로 강사 필드 변경
    instructorId: "UID_INSTRUCTOR_1",
    instructorName: "조성훈",
    category: "",
    level: "",
    price: 30000,
    thumbnailUrl: "",
    summary: "",
    content: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const validateCourseForm = (formData) => {
    if (!formData.title.trim()) return "강좌명을 입력하세요.";
    if (!formData.category) return "카테고리를 선택하세요.";
    if (!formData.level) return "난이도를 선택하세요.";
    if (formData.price <= 0) {
      return "가격은 0원보다 크게 입력하세요.";
    }
    if (!formData.summary.trim()) return "강좌 요약을 입력하세요.";
    if (!formData.content.trim()) return "강좌 내용을 입력하세요.";
    return "";
  };

  const handleOnChange = (e) => {
    const { name } = e.target;

    if (name === "thumbnailUrl") {
      // base64 문자열 변환
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          //base64 변환 결과 값
          [name]: reader.result,
        });
      };
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateCourseForm(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const courseId = await createCourse(formData);
      console.log("게시글 등록 완료");
      navigate(`/courses/${courseId}`);
      setError("");
    } catch (error) {
      setError("게시글 등록 실패");
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-create-form">
      {error && (
        <span className="course-create-form__error-message">{error}</span>
      )}

      <div className="course-create-form__group course-create-form__group--inline">
        <label className="course-create-form__field">
          <span className="course-create-form__label">강좌명</span>
          <input
            name="title"
            value={formData.title}
            className="course-create-form__input"
            type="text"
            placeholder="강좌 제목을 입력해주세요."
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-create-form__group course-create-form__group--grid">
        <label className="course-create-form__field">
          <span className="course-create-form__label">카테고리</span>
          <select
            name="category"
            value={formData.category}
            className="course-create-form__select"
            onChange={handleOnChange}
          >
            <option value="" disabled>
              카테고리 선택
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="course-create-form__field">
          <span className="course-create-form__label">난이도</span>
          <select
            name="level"
            value={formData.level}
            className="course-create-form__select"
            onChange={handleOnChange}
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="beginner">초급</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
        </label>

        <label className="course-create-form__field">
          <span className="course-create-form__label">가격 (원)</span>
          <input
            name="price"
            value={formData.price}
            className="course-create-form__input"
            type="number"
            placeholder="예: 55000"
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-create-form__group">
        <span className="course-create-form__label">썸네일 이미지</span>
        <div className="course-create-form__thumbnail">
          {formData.thumbnailUrl ? (
            <img
              src={formData.thumbnailUrl}
              className="course-create-form__thumbnail-preview"
            />
          ) : (
            <div className="course-create-form__thumbnail-preview">
              미리보기
            </div>
          )}

          <input
            name="thumbnailUrl"
            id="thumbnail-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={handleOnChange}
          />
          <label
            htmlFor="thumbnail-upload"
            className="course-create-form__thumbnail-button"
          >
            파일 업로드
          </label>
          <p className="course-create-form__thumbnail-hint">
            PNG, JPG, GIF up to 10MB.
          </p>
        </div>
      </div>

      <div className="course-create-form__group">
        <label className="course-create-form__field">
          <span className="course-create-form__label">강좌 요약</span>
          <textarea
            name="summary"
            value={formData.summary}
            className="course-create-form__textarea"
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-create-form__group">
        <label className="course-create-form__field">
          <span className="course-create-form__label">강좌 내용</span>
          <textarea
            name="content"
            value={formData.content}
            className="course-create-form__textarea"
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-create-form__actions">
        <button
          className="course-create-form__action-button course-create-form__action-button--cancel"
          type="reset"
        >
          초기화
        </button>
        <button
          className="course-create-form__action-button course-create-form__action-button--submit"
          type="submit"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}

export default CourseCreateForm;
