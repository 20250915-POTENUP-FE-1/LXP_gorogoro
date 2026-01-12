'use client';

import type { ChangeEvent } from 'react';
import styles from './CourseCurriculumEditor.module.css';
import { Button } from '@/shared/components/ui/Button';
import { CourseFormRequest } from '@/features/instructor/types';

interface CourseCurriculumProps {
  formData: CourseFormRequest;
  addChapter?: () => void;
  addLesson?: (chapterIdx: number) => void;
  handleChapterTitleChange?: (chapterIdx: number) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonTitleChange?: (
    chapterIdx: number,
    lessonIdx: number,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleLessonResourceUrlChange?: (
    chapterIdx: number,
    lessonIdx: number,
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseCurriculum({
  formData,
  addChapter,
  addLesson,
  handleChapterTitleChange,
  handleLessonTitleChange,
  handleLessonResourceUrlChange,
}: CourseCurriculumProps) {
  return (
    <div className={styles.container}>
      {addChapter && (
        <div className={styles.header}>
          <Button variant="add" type="button" onClick={addChapter}>
            + 챕터 추가
          </Button>
        </div>
      )}

      <div className={styles.chapterList}>
        {formData.contents?.map((chapter, chapterIdx) => (
          <div key={chapter.chapterId ?? chapterIdx} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterSeq}>Chapter {chapterIdx + 1}</span>
              <input
                name={`contents[${chapterIdx}][title]`}
                value={chapter.title ?? ''}
                className={styles.input}
                type="text"
                placeholder="챕터 제목을 입력하세요"
                onChange={handleChapterTitleChange?.(chapterIdx)}
              />
            </div>

            <div className={styles.lessonList}>
              {chapter.lessons.map((lesson, lessonIdx) => (
                <div key={lesson.lessonId ?? lessonIdx} className={styles.lessonItem}>
                  <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>

                  <input
                    name={`contents[${chapterIdx}][lessons][${lessonIdx}][title]`}
                    value={lesson.title ?? ''}
                    className={styles.input}
                    type="text"
                    placeholder="레슨 제목 (예: 코딩이란?)"
                    onChange={handleLessonTitleChange?.(chapterIdx, lessonIdx)}
                  />

                  <input
                    name={`contents[${chapterIdx}][lessons][${lessonIdx}][resourceUrl]`}
                    value={lesson.resourceUrl ?? ''}
                    className={styles.input}
                    type="text"
                    placeholder="영상/자료 URL"
                    onChange={handleLessonResourceUrlChange?.(chapterIdx, lessonIdx)}
                  />
                </div>
              ))}

              {addLesson && (
                <Button variant="add" size="sm" type="button" onClick={() => addLesson(chapterIdx)}>
                  + 강의 추가
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
