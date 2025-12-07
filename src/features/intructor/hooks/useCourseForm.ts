import { useState, ChangeEvent } from "react";
import { CourseFormData } from "../types";

export function useCourseForm(initialFormData: CourseFormData) {
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleChapterTitleChange =
    (chapterIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        content: prev.content.map((chapter, idx) =>
          idx === chapterIdx ? { ...chapter, chapterTitle: value } : chapter
        ),
      }));
    };

  const handleLessonTitleChange =
    (chapterIdx: number, lessonIdx: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        content: prev.content.map((chapter, cIdx) => {
          if (cIdx !== chapterIdx) return chapter;
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lIdx) =>
              lIdx === lessonIdx ? { ...lesson, title: value } : lesson
            ),
          };
        }),
      }));
    };

  const handleLessonResourceUrlChange =
    (chapterIdx: number, lessonIdx: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        content: prev.content.map((chapter, cIdx) => {
          if (cIdx !== chapterIdx) return chapter;
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lIdx) =>
              lIdx === lessonIdx ? { ...lesson, resourceUrl: value } : lesson
            ),
          };
        }),
      }));
    };

  const addChapter = () => {
    setFormData((prev) => {
      const _oldContent = prev.content;
      const _newContent = {
        chapterTitle: "",
        seq: prev.content.length + 1,
        lessons: [
          {
            title: "",
            seq: 1,
            resourceUrl: "",
          },
        ],
      };
      return { ...prev, content: [..._oldContent, _newContent] };
    });
  };

  const addLesson = (chapterIdx: number) => {
    setFormData((prev) => {
      const newContent = prev.content.map((chapter, idx) => {
        if (idx !== chapterIdx) return chapter;
        const _oldLesson = chapter.lessons;
        const _newLesson = {
          title: "",
          seq: chapter.lessons.length + 1,
          resourceUrl: "",
        };
        return {
          ...chapter,
          lessons: [..._oldLesson, _newLesson],
        };
      });
      return {
        ...prev,
        content: newContent,
      };
    });
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fakeUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, thumbnailUrl: fakeUrl }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleFieldChange,
    handleChapterTitleChange,
    handleLessonTitleChange,
    handleLessonResourceUrlChange,
    addChapter,
    addLesson,
    handleThumbnailChange,
    resetForm,
  };
}
