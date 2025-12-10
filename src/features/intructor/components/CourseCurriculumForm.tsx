"use client";

import { ChangeEvent } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormRequest } from "../types";
import CourseCurriculum from "@/features/courses/components/CourseCurriculum";

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
      </div>

      <CourseCurriculum
        contents={formData.contents || []}
        mode="edit"
        addChapter={addChapter}
        addLesson={addLesson}
        handleChapterTitleChange={handleChapterTitleChange}
        handleLessonTitleChange={handleLessonTitleChange}
        handleLessonResourceUrlChange={handleLessonResourceUrlChange}
      />
    </div>
  );
}
