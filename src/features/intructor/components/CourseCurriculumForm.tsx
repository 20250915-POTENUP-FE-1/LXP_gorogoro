"use client";

import { ChangeEvent } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormRequest } from "../types";

interface CourseCurriculumFormProps {
  formData: CourseFormRequest;
  addChapter: () => void;
  addLesson: (chapterIdx: number) => void;
  handleChapterTitleChange: (
    chapterIdx: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonTitleChange: (
    chapterIdx: number,
    lessonIdx: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonResourceUrlChange: (
    chapterIdx: number,
    lessonIdx: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseCurriculumForm({
  formData,
  addChapter,
  addLesson,
  handleChapterTitleChange,
  handleLessonTitleChange,
  handleLessonResourceUrlChange,
}: CourseCurriculumFormProps) {
  return (
    <div className={styles.group}>
      <div className={styles.sectionHeader}>
        <span className={styles.label}>커리큘럼</span>
        <button type="button" onClick={addChapter} className={styles.addButton}>
          + 챕터 추가
        </button>
      </div>

      <div className={styles.chapterList}>
        {formData.contents?.map((chapter, chapterIdx) => (
          <div key={chapterIdx} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterSeq}>
                Chapter {chapterIdx + 1}
              </span>
              <input
                name={`contents[${chapterIdx}][chapterTitle]`}
                value={chapter.chapterTitle ?? ""}
                className={styles.input}
                type="text"
                placeholder="챕터 제목을 입력하세요"
                onChange={handleChapterTitleChange(chapterIdx)}
              />
            </div>

            <div className={styles.lessonList}>
              {chapter.lessons.map((lesson, lessonIdx) => (
                <div key={lessonIdx} className={styles.lessonItem}>
                  <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>
                  <input
                    name={`contents[${chapterIdx}][lessons][${lessonIdx}][title]`}
                    value={lesson.title}
                    className={styles.input}
                    type="text"
                    placeholder="레슨 제목 (예: 코딩이란?)"
                    onChange={handleLessonTitleChange(chapterIdx, lessonIdx)}
                  />
                  <input
                    name={`contents[${chapterIdx}][lessons][${lessonIdx}][resourceUrl]`}
                    value={lesson.resourceUrl ?? ""}
                    className={styles.input}
                    type="text"
                    placeholder="영상/자료 URL"
                    onChange={handleLessonResourceUrlChange(
                      chapterIdx,
                      lessonIdx
                    )}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => addLesson(chapterIdx)}
                className={styles.addLessonButton}
              >
                + 강의 추가
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
