"use client";

import { ChangeEvent, FormEvent } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormData } from "../types";
import { useCourseForm } from "../hooks/useCourseForm";

interface CourseFormProps {
  initialFormData?: CourseFormData;
}

const defaultFormData: CourseFormData = {
  title: "",
  instructorId: "",
  instructorName: "",
  category: "",
  level: "",
  price: 0,
  thumbnailUrl: "",
  summary: "",
  description: "",
  contents: [
    {
      chapterTitle: "",
      seq: 0,
      lessons: [
        {
          title: "",
          seq: 0,
          resourceUrl: "",
        },
      ],
    },
  ],
};

export default function CourseForm({
  initialFormData = defaultFormData,
}: CourseFormProps) {
  const {
    formData,
    handleFieldChange,
    handleChapterTitleChange,
    handleLessonTitleChange,
    addChapter,
    addLesson,
    handleThumbnailChange,
    resetForm,
  } = useCourseForm(initialFormData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("제출 데이터:", formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <button
          type="button"
          onClick={() => {
            console.log(formData);
            addChapter();
          }}
          className={styles.actionButtonAdd}
        >
          챕터 추가
        </button>
      </div>

      {formData.contents.length === 0
        ? null
        : formData.contents?.map((chapter, chapterIdx) => (
            <div key={chapterIdx}>
              <div className={`${styles.group} ${styles.groupInline}`}>
                <label className={styles.field}>
                  <span className={styles.label}>챕터</span>
                  <input
                    name="chapterTitle"
                    value={chapter.chapterTitle ?? ""}
                    className={styles.input}
                    type="text"
                    placeholder="챕터 제목을 입력하세요"
                    onChange={handleChapterTitleChange(chapterIdx)}
                  />
                </label>
              </div>

              {chapter.lessons.map((lesson, lessonIdx) => (
                <div key={lessonIdx}>
                  <label className={styles.field}>
                    <span className={styles.label}>레슨 제목</span>
                    <input
                      name="lessonTitle"
                      value={lesson.title}
                      className={styles.input}
                      type="text"
                      placeholder="예: 코딩이란?"
                      onChange={handleLessonTitleChange(chapterIdx, lessonIdx)}
                    />
                  </label>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addLesson(chapterIdx)}
                className={styles.actionButtonAdd}
              >
                레슨 추가
              </button>
            </div>
          ))}

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
            name="category"
            value={formData.category}
            className={styles.select}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              카테고리 선택
            </option>
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
          {formData.thumbnailUrl ? (
            <img
              src={formData.thumbnailUrl}
              className={styles.thumbnailPreview}
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

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.actionButtonCancel}`}
          type="reset"
          onClick={resetForm}
        >
          초기화
        </button>
        <button
          className={`${styles.actionButton} ${styles.actionButtonSubmit}`}
          type="submit"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
