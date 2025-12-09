import { ChangeEvent } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormData } from "../types";

interface CourseBasicInfoFormProps {
  formData: CourseFormData;
  handleFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseBasicInfoForm({
  formData,
  handleFieldChange,
  handleThumbnailChange,
}: CourseBasicInfoFormProps) {
  return (
    <>
      <div className={`${styles.group} ${styles.groupInline}`}>
        <label className={styles.field}>
          <span className={styles.label}>강좌명</span>
          <input
            name="title"
            value={formData.title}
            className={styles.input}
            type="text"
            placeholder="강좌 제목을 입력해주세요."
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={`${styles.group} ${styles.groupGrid}`}>
        <label className={styles.field}>
          <span className={styles.label}>카테고리</span>
          <select
            name="categoryId"
            value={formData.categoryId}
            className={styles.select}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              카테고리 선택
            </option>
            <option value="1">데이터 분석</option>
            <option value="2">게임 개발</option>
            <option value="3">머신 러닝</option>
            <option value="4">파이썬</option>
            <option value="5">웹 개발</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>난이도</span>
          <select
            name="level"
            value={formData.level}
            className={styles.select}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="beginner">초급</option>
            <option value="intermediate">중급</option>
            <option value="advanced">고급</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>가격 (원)</span>
          <input
            name="price"
            value={formData.price}
            className={styles.input}
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>썸네일 이미지</span>
        <div className={styles.thumbnail}>
          {formData.coverImageUrl ? (
            <img
              src={formData.coverImageUrl}
              className={styles.thumbnailPreview}
              alt="Thumbnail Preview"
            />
          ) : (
            <div className={styles.thumbnailPreview}>미리보기</div>
          )}

          <input
            name="thumbnailUrl"
            id="thumbnail-upload"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={handleThumbnailChange}
          />
          <label htmlFor="thumbnail-upload" className={styles.thumbnailButton}>
            파일 업로드
          </label>
          <p className={styles.thumbnailHint}>PNG, JPG 최대 1MB.</p>
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.field}>
          <span className={styles.label}>강좌 요약</span>
          <textarea
            name="summary"
            value={formData.summary}
            className={styles.textarea}
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={styles.group}>
        <label className={styles.field}>
          <span className={styles.label}>강좌 내용</span>
          <textarea
            name="description"
            value={formData.description}
            className={styles.textarea}
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
            onChange={handleFieldChange}
          />
        </label>
      </div>
    </>
  );
}
