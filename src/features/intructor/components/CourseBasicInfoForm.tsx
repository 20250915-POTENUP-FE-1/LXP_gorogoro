"use client";

import { ChangeEvent } from "react";
import styles from "./CourseForm.module.css";
import { Input, Label } from "@/shared/components/ui";
import { CourseFormRequest } from "../types";
import { Category } from "@/features/courses/types";

interface CourseBasicInfoFormProps {
  categories: Category[];
  formData: CourseFormRequest;
  handleFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseBasicInfoForm({
  categories,
  formData,
  handleFieldChange,
  handleThumbnailChange,
}: CourseBasicInfoFormProps) {
  return (
    <div className={styles.form}>
      <div className={`${styles.group} ${styles.groupInline}`}>
        <div className={styles.field}>
          <Label htmlFor="title">강좌명</Label>
          <Input
            name="title"
            id="title"
            type="text"
            placeholder="강좌 제목을 입력해주세요."
            value={formData.title ?? ""}
            onChange={handleFieldChange}
          />
        </div>
      </div>

      <div className={`${styles.group} ${styles.groupGrid}`}>
        <div className={styles.field}>
          <Label htmlFor="categoryId">카테고리</Label>
          <select
            name="categoryId"
            id="categoryId"
            className={styles.select}
            value={formData.categoryId ?? ""}
            onChange={handleFieldChange}
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
        </div>

        <div className={styles.field}>
          <Label htmlFor="difficulty">난이도</Label>
          <select
            name="difficulty"
            id="difficulty"
            className={styles.select}
            value={formData.difficulty ?? ""}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="BEGINNER">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="ADVANCED">고급</option>
          </select>
        </div>

        <div className={styles.field}>
          <Label htmlFor="price">가격 (원)</Label>
          <Input
            name="price"
            id="price"
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
            value={formData.price ?? 0}
            onChange={handleFieldChange}
          />
        </div>
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
            name="coverImageUrl"
            id="coverImageUrl"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: "none" }}
            onChange={handleThumbnailChange}
          />
          <Label htmlFor="coverImageUrl" className={styles.thumbnailButton}>
            파일 업로드
          </Label>
          <p className={styles.thumbnailHint}>PNG, JPG 최대 1MB.</p>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.field}>
          <Label htmlFor="summary">강좌 요약</Label>
          <textarea
            name="summary"
            id="summary"
            className={styles.textarea}
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
            value={formData.summary ?? ""}
            onChange={handleFieldChange}
          />
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.field}>
          <Label htmlFor="description">강좌 내용</Label>
          <textarea
            name="description"
            id="description"
            className={styles.textarea}
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
            value={formData.description ?? ""}
            onChange={handleFieldChange}
          />
        </div>
      </div>
    </div>
  );
}
