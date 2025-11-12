import "./CourseEditForm.css";

import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse } from "../../services/courseService";

const MAX_THUMBNAIL_SIZE = 1 * 1024 * 1024; // 1MB

function CourseEditForm({ courseId }) {
  const { categories } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCourseById(courseId);
      setFormData(result);
    };
    fetchData();
  }, [courseId]);

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
      setFormData({
        ...formData,
        [name]: e.target.value,
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
      await updateCourse(courseId, formData);
      console.log("게시글 수정 완료");
      navigate("/instructor/courses");
      setError("");
    } catch (error) {
      setError("게시글 등록 실패");
      throw error;
    }
  };

  if (!formData) {
    return <div>로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="course-edit-form">
      {error && (
        <span className="course-edit-form__error-message">{error}</span>
      )}
      <div className="course-edit-form__group course-edit-form__group--inline">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌명</span>
          <input
            name="title"
            className="course-edit-form__input"
            type="text"
            placeholder="강좌 제목을 입력해주세요."
            value={formData.title}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-edit-form__group course-edit-form__group--grid">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">카테고리</span>
          <select
            name="category"
            className="course-edit-form__select"
            value={formData.category}
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

        <label className="course-edit-form__field">
          <span className="course-edit-form__label">레벨</span>
          <select
            name="level"
            className="course-edit-form__select"
            value={formData.level}
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

        <label className="course-edit-form__field">
          <span className="course-edit-form__label">가격 (원)</span>
          <input
            name="price"
            className="course-edit-form__input"
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
            value={formData.price}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-edit-form__group">
        <span className="course-edit-form__label">썸네일 이미지</span>
        <div className="course-edit-form__thumbnail">
          {formData.thumbnailUrl ? (
            <img
              src={formData.thumbnailUrl}
              className="course-edit-form__thumbnail-preview"
            />
          ) : (
            <div className="course-edit-form__thumbnail-preview">미리보기</div>
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
            className="course-edit-form__thumbnail-button"
          >
            파일 업로드
          </label>
          <p className="course-edit-form__thumbnail-hint">PNG, JPG 최대 1MB.</p>
        </div>
      </div>

      <div className="course-edit-form__group">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌 요약</span>
          <textarea
            name="summary"
            value={formData.summary}
            className="course-edit-form__textarea"
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-edit-form__group">
        <label className="course-edit-form__field">
          <span className="course-edit-form__label">강좌 내용</span>
          <textarea
            name="content"
            value={formData.content}
            className="course-edit-form__textarea"
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
            onChange={handleOnChange}
          />
        </label>
      </div>

      <div className="course-edit-form__actions">
        <button
          className="course-edit-form__action-button course-edit-form__action-button--cancel"
          type="rest"
        >
          취소
        </button>
        <button
          className="course-edit-form__action-button course-edit-form__action-button--submit"
          type="submit"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}

export default CourseEditForm;
