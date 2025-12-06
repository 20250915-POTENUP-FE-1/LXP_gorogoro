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

  //챕터 제목 체인지
  const handleChapterTitleChange =
    (chapterIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        contents: prev.contents.map((chapter, idx) =>
          idx === chapterIdx ? { ...chapter, chapterTitle: value } : chapter
        ),
      }));
    };
  //레슨 제목 체인지
  const handleLessonTitleChange =
    (chapterIdx: number, lessonIdx: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        contents: prev.contents.map((chapter, cIdx) => {
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
  //챕터 추가
  // - 기존 contents 배열을 기반으로 마지막에 새 챕터를 하나 더 붙인다
  // - 새 챕터는 빈 제목 + 레슨 1개(빈 레슨)으로 시작
  const addChapter = () => {
    setFormData((prev) => {
      const _oldContent = prev.contents;
      const _newContent = {
        chapterTitle: "",
        lessons: [
          {
            title: "",
            resourceUrl: "",
          },
        ],
      };
      return { ...prev, contents: [..._oldContent, _newContent] };
    });
  };
  //레슨 추가
  // - 특정 chapterIdx를 받아서, 그 챕터의 lessons 배열에 새 레슨을 뒤에 추가
  const addLesson = (chapterIdx: number) => {
    setFormData((prev) => {
      const newContent = prev.contents.map((chapter, idx) => {
        if (idx !== chapterIdx) return chapter;
        const _oldLesson = chapter.lessons;
        const _newLesson = {
          title: "",
          resourceUrl: "",
        };
        return {
          ...chapter,
          lessons: [..._oldLesson, _newLesson],
        };
      });
      return {
        ...prev,
        contents: newContent,
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
    addChapter,
    addLesson,
    handleThumbnailChange,
    resetForm,
  };
}
