'use client';

import { ChangeEvent } from 'react';
import styles from './CourseForm.module.css';
import { CourseFormRequest } from '../types';
import CourseCurriculum from '@/features/instructor/components/CourseCurriculumEditor';
import { CourseFormResponse } from '@/features/instructor/action';

interface CourseCurriculumFormProps {
  formData: CourseFormRequest;
  addChapter: () => void;
  addLesson: (chapterIdx: number) => void;
  handleChapterTitleChange: (chapterIdx: number) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonTitleChange: (
    chapterIdx: number,
    lessonIdx: number,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonResourceUrlChange: (
    chapterIdx: number,
    lessonIdx: number,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  state: CourseFormResponse;
}

export default function CourseCurriculumForm({
  formData,
  addChapter,
  addLesson,
  handleChapterTitleChange,
  handleLessonTitleChange,
  handleLessonResourceUrlChange,
  state,
}: CourseCurriculumFormProps) {
  return (
    <div className={styles.group}>
      {/* useFieldArray 사용하기 */}
      <CourseCurriculum
        formData={formData}
        addChapter={addChapter}
        addLesson={addLesson}
        handleChapterTitleChange={handleChapterTitleChange}
        handleLessonTitleChange={handleLessonTitleChange}
        handleLessonResourceUrlChange={handleLessonResourceUrlChange}
        state={state}
      />
    </div>
  );
}
