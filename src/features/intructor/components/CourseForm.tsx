"use client";

import { CourseFormData } from "../types";
import styles from "./CourseForm.module.css";
import { useState } from "react";

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
    content: [],
  },
}: CourseFormProps) {
  const [formData, setFormData] = useState(initialFormData);

  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      content: [
        ...prev.content,
        { chapterTitle: "", seq: prev.content.length + 1, lessons: [] },
      ],
    }));
  };

  const addLesson = (chapterIndex: number) => {
    setFormData((prev) => {
      const newContent = [...prev.content];
      const chapter = newContent[chapterIndex];

      newContent[chapterIndex] = {
        ...chapter,
        lessons: [
          ...chapter.lessons,
          {
            title: "",
            seq: chapter.lessons.length + 1,
            resourceUrl: null,
          },
        ],
      };

      return { ...prev, content: newContent };
    });
  };

  return (
    <form className={styles.form}>
      <div className={`${styles.group} ${styles.groupInline}`}>
        <label className={styles.field}>
          <span className={styles.label}>강좌명</span>
          <input
            name="title"
            value={initialFormData.title}
            className={styles.input}
            type="text"
            placeholder="강좌 제목을 입력해주세요."
          />
        </label>
      </div>

      <div className={`${styles.group} ${styles.groupGrid}`}>
        <label className={styles.field}>
          <span className={styles.label}>카테고리</span>
          <select
            name="category"
            value={initialFormData.category}
            className={styles.select}
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

        <label className={styles.field}>
          <span className={styles.label}>난이도</span>
          <select
            name="level"
            value={initialFormData.level}
            className={styles.select}
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
            value={initialFormData.price}
            className={styles.input}
            type="number"
            step={1000}
            min={0}
            placeholder="예: 55000"
          />
        </label>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>썸네일 이미지</span>
        <div className={styles.thumbnail}>
          {initialFormData.thumbnailUrl ? (
            <img
              src={initialFormData.thumbnailUrl}
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
            value={initialFormData.summary}
            className={styles.textarea}
            placeholder="강좌에 대한 짧은 요약을 입력하세요."
            rows={4}
          />
        </label>
      </div>

      <div className={styles.group}>
        <div className={styles.sectionHeader}>
          <span className={styles.label}>커리큘럼</span>
          <button
            type="button"
            className={styles.addButton}
            onClick={addChapter}
          >
            + 챕터 추가
          </button>
        </div>

        <div className={styles.chapterList}>
          {formData.content.map((chapter, chapterIdx) => (
            <div key={chapterIdx} className={styles.chapterItem}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterSeq}>Chapter {chapter.seq}</span>
                <input
                  className={styles.input}
                  placeholder="챕터 제목을 입력하세요"
                  value={chapter.chapterTitle}
                  onChange={(e) => {
                    const newContent = [...formData.content];
                    newContent[chapterIdx] = {
                      ...newContent[chapterIdx],
                      chapterTitle: e.target.value,
                    };
                    setFormData({ ...formData, content: newContent });
                  }}
                />
              </div>

              <div className={styles.lessonList}>
                {chapter.lessons.map((lesson, lessonIdx) => (
                  <div key={lessonIdx} className={styles.lessonItem}>
                    <span className={styles.lessonSeq}>{lesson.seq}.</span>
                    <input
                      className={styles.input}
                      placeholder="강의 제목"
                      value={lesson.title}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        const newLessons = [...newContent[chapterIdx].lessons];
                        newLessons[lessonIdx] = {
                          ...newLessons[lessonIdx],
                          title: e.target.value,
                        };
                        newContent[chapterIdx] = {
                          ...newContent[chapterIdx],
                          lessons: newLessons,
                        };
                        setFormData({ ...formData, content: newContent });
                      }}
                    />
                    <input
                      className={styles.input}
                      placeholder="영상/자료 URL"
                      value={lesson.resourceUrl || ""}
                      onChange={(e) => {
                        const newContent = [...formData.content];
                        const newLessons = [...newContent[chapterIdx].lessons];
                        newLessons[lessonIdx] = {
                          ...newLessons[lessonIdx],
                          resourceUrl: e.target.value,
                        };
                        newContent[chapterIdx] = {
                          ...newContent[chapterIdx],
                          lessons: newLessons,
                        };
                        setFormData({ ...formData, content: newContent });
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addLessonButton}
                  onClick={() => addLesson(chapterIdx)}
                >
                  + 강의 추가
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.actionButtonCancel}`}
          type="reset"
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
