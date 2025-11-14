﻿import "./CourseCreateForm.css";

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createCourse } from "../../services/courseService";

const MAX_THUMBNAIL_SIZE = 1 * 1024 * 1024; // 1MB

function CourseCreateForm() {
  const { categories, userProfile, triggerRefreshCourses } = useOutletContext(); // triggerRefreshCourses 추가
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    // 추후 currentUser 값으로 강사 필드 변경
    instructorId: userProfile.id,
    instructorName: userProfile.displayName,
    category: "",
    level: "",
    price: 30000,
    thumbnailUrl: "",
    summary: "",
    content: "",
  });
  const validateCourseForm = (currentFormData) => {
    if (!currentFormData.title.trim()) return "강좌명을 입력하세요.";
    if (!currentFormData.category) return "카테고리를 선택하세요.";
    if (!currentFormData.level) return "난이도를 선택하세요.";

    if (formData.price <= 0) {
      return "가격은 0원보다 크게 입력하세요.";
    }

    if (formData.price >= 1000000) {
      return "가격은 100만원 이상 설정할 수 없습니다.";
    }

    if (!currentFormData.summary.trim()) return "강좌 요약을 입력하세요.";
    if (!currentFormData.content.trim()) return "강좌 내용을 입력하세요.";
    return "";
  };

  const handleOnChange = (e) => {
    const { name } = e.target;

    if (name === "thumbnailUrl") {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_THUMBNAIL_SIZE) {
        setError("썸네일 이미지는 1MB 이하만 업로드할 수 있습니다.");
        e.target.value = "";
        return;
      }

      setError("");

      // base64 문자열 변환
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          //base64 변환 함수
          [name]: reader.result,
        });
      };
    } else {
      const { value } = e.target;
      setFormData({
        ...formData,
        // name이 'price'인 경우 숫자 타입으로 변환
        [name]: name === "price" ? +value : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateCourseForm(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const courseId = await createCourse(formData);
      console.log("강좌 등록 완료");
      triggerRefreshCourses(); // 강좌 목록 갱신 트리거
      navigate(`/instructor/courses`); // 생성 후 강좌 목록 페이지로 이동
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
            step={1000}
            min={0}
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
            PNG, JPG 최대 1MB.
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
