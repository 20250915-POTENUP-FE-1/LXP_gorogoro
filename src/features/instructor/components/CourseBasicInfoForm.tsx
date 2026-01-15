'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './CourseForm.module.css';
import { CourseFormRequest } from '../types';
import { Category } from '@/features/courses/types';
import FieldInput from '@/shared/components/ui/FieldInput';
import FieldTextarea from '@/shared/components/ui/FieldTextarea';
import { CourseFormResponse } from '@/features/instructor/action';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';
import { useLocalStorageImage } from '@/shared/lib/coverImageField';

interface CourseBasicInfoFormProps {
  formData: CourseFormRequest;
  handleFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  state: CourseFormResponse;
}

export default function CourseBasicInfoForm({
  formData,
  handleFieldChange,
  handleThumbnailChange,
  categories,
  state,
}: CourseBasicInfoFormProps) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const { preview, storedRef, onFileChange } = useLocalStorageImage({
    initial: formData.coverImageUrl ?? undefined,
    bucket: 'courseCover:',
  });

  const thumbnailPreviewSrc = preview || '';

  // 훅이 만든 storedRef를 hidden에 반영
  useEffect(() => {
    if (hiddenRef.current) hiddenRef.current.value = storedRef ?? '';
  }, [storedRef]);

  return (
    <div className={styles.form} style={{}}>
      <div className={`${styles.group} ${styles.groupInline}`}>
        <FieldInput
          label="강좌명"
          name="title"
          type="text"
          placeholder="강좌 제목을 입력해주세요."
          inputStyle={{ width: '100%' }}
          onChange={handleFieldChange}
          value={formData.title ?? ''}
          errorMessage={state.errors?.title}
        />
        <FieldInput
          label="강의 이용 기간(숫자만)"
          id="accessDays"
          name="accessDays"
          type="number"
          placeholder="90"
          value={formData.accessDays === 0 ? '' : String(formData.accessDays ?? '')}
          onChange={(e) => {
            const raw = e.target.value; // '' | '123'
            handleFieldChange({
              ...e,
              target: {
                ...e.target,
                name: 'accessDays',
                value: raw === '' ? 0 : String(parseInt(raw, 10)),
              },
            });
          }}
          errorMessage={state.errors?.accessDays}
        />
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
          {state.errors?.categoryId && <ErrorMessage errorMessage={state.errors?.categoryId} />}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>난이도</span>
          <select
            name="courseDifficulty"
            id="courseDifficulty"
            className={styles.select}
            value={formData.courseDifficulty ?? ''}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              난이도 선택
            </option>
            <option value="BASIC">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="PROFESSIONAL">고급</option>
          </select>
          {state.errors?.courseDifficulty && (
            <ErrorMessage errorMessage={state.errors?.courseDifficulty} />
          )}
        </label>

        <FieldInput
          label="가격 (원)"
          id="price"
          name="price"
          type="number"
          placeholder="예: 55000"
          value={formData.price === 0 ? '' : String(formData.price ?? '')}
          onChange={(e) => {
            const raw = e.target.value; // '' | '123'
            handleFieldChange({
              ...e,
              target: {
                ...e.target,
                name: 'price',
                value: raw === '' ? 0 : String(parseInt(raw, 10)),
              },
            });
          }}
          errorMessage={state.errors?.price}
        />
      </div>

      <div className={styles.group}>
        <span className={styles.label}>썸네일 이미지</span>

        <div className={styles.thumbnail}>
          {thumbnailPreviewSrc ? (
            // next/image는 dataURL도 되긴 하지만 설정에 따라 막힐 수 있어서
            // 일단은 <img> 추천 (로컬 임시용)
            <img
              src={thumbnailPreviewSrc}
              className={styles.thumbnailPreview}
              alt="Thumbnail Preview"
            />
          ) : (
            <div className={styles.thumbnailPreview}>미리보기</div>
          )}

          <input type="hidden" name="coverImageUrl" value={storedRef} readOnly />

          <input
            id="coverFile"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />

          <label htmlFor="coverFile" className={styles.thumbnailButton}>
            파일 업로드
          </label>

          <p className={styles.thumbnailHint}>PNG, JPG 최대 1MB.</p>
        </div>

        {state.errors?.coverImageUrl && <ErrorMessage errorMessage={state.errors.coverImageUrl} />}
      </div>

      <div className={styles.group}>
        <FieldTextarea
          label="강좌 요약"
          name="summary"
          id="summary"
          placeholder="강좌에 대한 짧은 요약을 입력하세요."
          rows={4}
          value={formData.summary ?? ''}
          onChange={handleFieldChange}
          errorMessage={state.errors?.summary}
        />
      </div>

      <div className={styles.group}>
        <FieldTextarea
          label="강좌 내용"
          name="description"
          id="description"
          placeholder="강좌의 전체 내용을 상세하게 작성해주세요."
          rows={6}
          value={formData.description ?? ''}
          onChange={handleFieldChange}
          errorMessage={state.errors?.description ?? ''}
        />
      </div>
    </div>
  );
}
