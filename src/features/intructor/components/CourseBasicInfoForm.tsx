'use client';

import { ChangeEvent } from 'react';
import styles from './CourseForm.module.css';
import { CourseFormRequest } from '../types';
import Image from 'next/image';
import { Category } from '@/features/courses/types';

interface CourseBasicInfoFormProps {
  formData: CourseFormRequest;
  handleFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
}

export default function CourseBasicInfoForm({
  formData,
  handleFieldChange,
  handleThumbnailChange,
  categories,
}: CourseBasicInfoFormProps) {
  return (
    <div className={styles.form} style={{}}>
      <div className={`${styles.group} ${styles.groupInline}`}>
        <label className={styles.field}>
          <span className={styles.label}>강좌명</span>
          <input
            name="title"
            id="title"
            className={styles.input}
            type="text"
            placeholder="강좌 제목을 입력해주세요."
            value={formData.title ?? ''}
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={`${styles.group} ${styles.groupGrid}`}>
        <label className={styles.field}>
          <span className={styles.label}>카테고리</span>
          <select
            name="categoryId"
            id="categoryId"
            className={styles.select}
            value={formData.categoryId ?? ''}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              카테고리 선택
            </option>
            {categories.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                {cat.subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>난이도</span>
          <select
            name="difficulty"
            id="difficulty"
            className={styles.select}
            value={formData.courseDifficulty ?? ''}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="BEGINNER">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="ADVANCED">고급</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>가격 (원)</span>
          <input
            name="price"
            id="price"
            className={styles.input}
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
            value={formData.price ?? 0}
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>썸네일 이미지</span>
        <div className={styles.thumbnail}>
          {formData.coverImageUrl ? (
            <Image
              src={formData.coverImageUrl}
              className={styles.thumbnailPreview}
              alt="Thumbnail Preview"
              width={500}
              height={500}
            />
          ) : (
            <div className={styles.thumbnailPreview}>미리보기</div>
          )}

          <input
            name="coverImageUrl"
            id="coverImageUrl"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: 'none' }}
            onChange={handleThumbnailChange}
          />
          <label htmlFor="coverImageUrl" className={styles.thumbnailButton}>
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
            id="summary"
            className={styles.textarea}
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
            value={formData.summary ?? ''}
            onChange={handleFieldChange}
          />
        </label>
      </div>

      <div className={styles.group}>
        <label className={styles.field}>
          <span className={styles.label}>강좌 내용</span>
          <textarea
            name="description"
            id="description"
            className={styles.textarea}
            placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
            rows={6}
            value={formData.description ?? ''}
            onChange={handleFieldChange}
          />
        </label>
      </div>
    </div>
  );
}
