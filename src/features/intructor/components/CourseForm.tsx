"use client";

import { useActionState, useEffect, useState } from "react";
import styles from "./CourseForm.module.css";
import { CourseFormRequest } from "../types";
import { useCourseForm } from "../hooks/useCourseForm";
import CourseBasicInfoForm from "./CourseBasicInfoForm";
import CourseCurriculumForm from "./CourseCurriculumForm";
import { Category } from "@/features/courses/types";
import { CreateCourseAction, UpdateCourseAction } from "../action";
import { useModalStore } from "@/stores/useModalStore";
import { Button } from "@/shared/components/ui/button/Button";

export type CourseFormMode = "create" | "edit";

interface CourseFormProps {
  categories: Category[];
  id?: string;
  mode?: CourseFormMode;
  initialFormData?: CourseFormRequest;
}

// Default data matching types.ts (contents array)
const defaultFormData: CourseFormRequest = {
  title: "",
  categoryId: "",
  difficulty: "BEGINNER",
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
  availableDays: 9999,
};

export default function CourseForm({
  categories,
  id,
  mode = "create",
  initialFormData = defaultFormData,
}: CourseFormProps) {
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

  const [activeTab, setActiveTab] = useState<"basic" | "curriculum">("basic");

  const getAction = () => {
    if (mode === "create") {
      return CreateCourseAction;
    }
    return UpdateCourseAction.bind(null, id ?? "");
  };

  const [state, formAction, isPending] = useActionState(getAction(), {
    success: false,
    message: "",
    errors: {},
  });

  const { openModal } = useModalStore();

  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: "오류 발생",
        message: state.message,
      });
    }
  }, [state.success, state.message, openModal]);

  return (
    <form action={formAction} className={styles.form}>
      {/* Tab Navigation */}
      {isPending && <p>로딩중...</p>}
      {state.errors && <p>{state.message}</p>}
      <div className={styles.tabContainer}>
        <Button
          variant="tab"
          type="button"
          className={activeTab === "basic" ? styles.activeTab : ""}
          onClick={() => setActiveTab("basic")}
        >
          기본 정보
        </Button>
        <Button
          variant="tab"
          type="button"
          className={activeTab === "curriculum" ? styles.activeTab : ""}
          onClick={() => setActiveTab("curriculum")}
        >
          커리큘럼
        </Button>
      </div>

      {/* Step Content */}
      <div style={{ display: activeTab === "basic" ? "block" : "none" }}>
        <CourseBasicInfoForm
          categories={categories}
          formData={formData}
          handleFieldChange={handleFieldChange}
          handleThumbnailChange={handleThumbnailChange}
        />
      </div>

      <div style={{ display: activeTab === "curriculum" ? "block" : "none" }}>
        <CourseCurriculumForm
          formData={formData}
          addChapter={addChapter}
          addLesson={addLesson}
          handleChapterTitleChange={handleChapterTitleChange}
          handleLessonTitleChange={handleLessonTitleChange}
          handleLessonResourceUrlChange={handleLessonResourceUrlChange}
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="cancel"
          type="reset"
          onClick={resetForm}
        >
          초기화
        </Button>
        <Button
          variant="submit"
          type="submit"
        >
          {mode === "create" ? "개설하기" : "수정하기"}
        </Button>
      </div>
    </form>
  );
}
