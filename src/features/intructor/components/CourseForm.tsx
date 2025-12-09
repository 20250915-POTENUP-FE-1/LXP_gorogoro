"use client";

import { FormEvent, useState } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormData } from "../types";
import { useCourseForm } from "../hooks/useCourseForm";
import CourseBasicInfoForm from "./CourseBasicInfoForm";
import CourseCurriculumForm from "./CourseCurriculumForm";

export type CourseFormMode = "create" | "edit";

interface CourseFormProps {
  mode?: CourseFormMode;
  initialFormData?: CourseFormData;
}

// Default data matching types.ts (contents array)
const defaultFormData: CourseFormData = {
  title: "",
  instructorId: "",
  instructorName: "",
  categoryId: "",
  level: "BEGINNER",
  price: 0,
  coverImageUrl: "",
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
  mode = "create",
  initialFormData = defaultFormData,
}: CourseFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "curriculum">("basic");

  const {
    formData,
    handleFieldChange,
    handleChapterTitleChange,
    handleLessonTitleChange,
    handleLessonResourceUrlChange,
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
      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button
          type="button"
          className={`${styles.tabButton} ${
            activeTab === "basic" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("basic")}
        >
          기본 정보
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${
            activeTab === "curriculum" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("curriculum")}
        >
          커리큘럼
        </button>
      </div>

      {/* Step Content */}
      {activeTab === "basic" && (
        <CourseBasicInfoForm
          formData={formData}
          handleFieldChange={handleFieldChange}
          handleThumbnailChange={handleThumbnailChange}
        />
      )}

      {activeTab === "curriculum" && (
        <CourseCurriculumForm
          formData={formData}
          addChapter={addChapter}
          addLesson={addLesson}
          handleChapterTitleChange={handleChapterTitleChange}
          handleLessonTitleChange={handleLessonTitleChange}
          handleLessonResourceUrlChange={handleLessonResourceUrlChange}
        />
      )}

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
          {mode === "create" ? "개설하기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}
