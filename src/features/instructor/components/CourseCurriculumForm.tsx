'use client';

import { ChangeEvent } from 'react';
import styles from './CourseForm.module.css';
import { CourseFormRequest } from '../types';
import CourseCurriculum from '@/features/instructor/components/CourseCurriculumEditor';

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
      {/* useFieldArray 사용하기 */}
      <CourseCurriculum
        formData={formData}
        addChapter={addChapter}
        addLesson={addLesson}
        handleChapterTitleChange={handleChapterTitleChange}
        handleLessonTitleChange={handleLessonTitleChange}
        handleLessonResourceUrlChange={handleLessonResourceUrlChange}
      />
    </div>
  );
}
