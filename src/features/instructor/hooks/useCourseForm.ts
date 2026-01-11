import { useState, ChangeEvent } from 'react';
import { CourseFormRequest } from '../types';

export function useCourseForm(initialFormData: CourseFormRequest) {
  const [formData, setFormData] = useState<CourseFormRequest>(initialFormData);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleChapterTitleChange = (chapterIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      contents: prev.contents.map((chapter, idx) =>
        idx === chapterIdx ? { ...chapter, title: value } : chapter,
      ),
    }));
  };

  const handleLessonTitleChange =
    (chapterIdx: number, lessonIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        contents: prev.contents.map((chapter, cIdx) => {
          if (cIdx !== chapterIdx) return chapter;
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lIdx) =>
              lIdx === lessonIdx ? { ...lesson, title: value } : lesson,
            ),
          };
        }),
      }));
    };

  const handleLessonResourceUrlChange =
    (chapterIdx: number, lessonIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        contents: prev.contents.map((chapter, cIdx) => {
          if (cIdx !== chapterIdx) return chapter;
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lIdx) =>
              lIdx === lessonIdx ? { ...lesson, resourceUrl: value } : lesson,
            ),
          };
        }),
      }));
    };

  const addChapter = () => {
    console.log('click Add Chapter');
    setFormData((prev) => {
      const _oldContent = prev.contents;
      const _newContent = {
        title: '',
        lessons: [
          {
            title: '',
            seq: 1,
            resourceUrl: '',
          },
        ],
      };
      return { ...prev, contents: [..._oldContent, _newContent] };
    });
  };

  const addLesson = (chapterIdx: number) => {
    setFormData((prev) => {
      const newContent = prev.contents.map((chapter, idx) => {
        if (idx !== chapterIdx) return chapter;
        const _oldLesson = chapter.lessons;
        const _newLesson = {
          title: '',
          resourceUrl: '',
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
    setFormData((prev) => ({ ...prev, coverImageUrl: fakeUrl }));
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
