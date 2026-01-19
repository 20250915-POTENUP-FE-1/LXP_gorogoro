'use client';

import type { ChangeEvent } from 'react';
import styles from './CourseCurriculumEditor.module.css';
import { Button } from '@/shared/components/ui/Button';
import { CourseFormRequest } from '@/features/instructor/types';
import { CourseFormResponse } from '@/features/instructor/actions/course.action';
import ErrorMessage from '@/shared/components/ui/ErrorMessage';

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
  state: CourseFormResponse;
}

export default function CourseCurriculum({
  formData,
  addChapter,
  addLesson,
  handleChapterTitleChange,
  handleLessonTitleChange,
  handleLessonResourceUrlChange,
  state,
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
        {formData.contents?.map((chapter, chapterIdx) => {
          const chapterName = `contents[${chapterIdx}][title]`;
          const chapterIdName = `contents[${chapterIdx}][chapterId]`; // chapterId용 name

          return (
            <div
              key={chapter.chapterId ?? `new-chapter-${chapterIdx}`}
              className={styles.chapterItem}
            >
              {/* 1. 챕터 ID 숨겨서 넣기 */}
              <input type="hidden" name={chapterIdName} value={chapter.chapterId ?? ''} />

              <div className={styles.chapterHeader}>
                <span className={styles.chapterSeq}>Chapter {chapterIdx + 1}</span>

                <div className={styles.inputWrap}>
                  <input
                    name={chapterName}
                    value={chapter.title ?? ''}
                    className={styles.input}
                    type="text"
                    placeholder="챕터 제목을 입력하세요"
                    onChange={handleChapterTitleChange?.(chapterIdx)}
                  />
                  {state.errors?.[chapterName] && (
                    <ErrorMessage errorMessage={state.errors[chapterName]} />
                  )}
                </div>
              </div>

              <div className={styles.lessonList}>
                {chapter.lessons.map((lesson, lessonIdx) => {
                  const lessonTitleName = `contents[${chapterIdx}][lessons][${lessonIdx}][title]`;
                  const lessonUrlName = `contents[${chapterIdx}][lessons][${lessonIdx}][resourceUrl]`;
                  const lessonIdName = `contents[${chapterIdx}][lessons][${lessonIdx}][lessonId]`; // lessonId용 name

                  return (
                    <div key={`lesson-${chapterIdx}-${lessonIdx}`} className={styles.lessonItem}>
                      {/* 2. 레슨 ID 숨겨서 넣기 */}
                      <input type="hidden" name={lessonIdName} value={lesson.lessonId ?? ''} />

                      <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>

                      <div className={styles.inputWrap}>
                        <input
                          name={lessonTitleName}
                          value={lesson.title ?? ''}
                          className={styles.input}
                          type="text"
                          placeholder="레슨 제목 (예: 코딩이란?)"
                          onChange={handleLessonTitleChange?.(chapterIdx, lessonIdx)}
                        />
                        {state.errors?.[lessonTitleName] && (
                          <ErrorMessage errorMessage={state.errors[lessonTitleName]} />
                        )}
                      </div>

                      <div className={styles.inputWrap}>
                        <input
                          name={lessonUrlName}
                          value={lesson.resourceUrl ?? ''}
                          className={styles.input}
                          type="text"
                          placeholder="영상/자료 URL"
                          onChange={handleLessonResourceUrlChange?.(chapterIdx, lessonIdx)}
                        />

                        {state.errors?.[lessonUrlName] && (
                          <ErrorMessage errorMessage={state.errors[lessonUrlName]} />
                        )}
                      </div>
                      <Button variant="add" type="button" onClick={() => addLesson(chapterIdx)}>
                        + 강의 추가
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
