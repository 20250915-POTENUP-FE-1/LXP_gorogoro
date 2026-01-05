'use client';

import { ChangeEvent } from 'react';
import styles from './CourseCurriculum.module.css';
import { Chapter } from '../types';
import { Button } from '@/shared/components/ui/Button';

interface CourseCurriculumProps {
  contents: Chapter[];
  mode?: 'view' | 'edit';
  // 편집 모드용 props

  // useFieldArray 사용하면 props로 함수 전달 받지 않아도 됨
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
  contents,
  mode = 'view',
  addChapter,
  addLesson,
  handleChapterTitleChange,
  handleLessonTitleChange,
  handleLessonResourceUrlChange,
}: CourseCurriculumProps) {
  // 편집 모드
  if (mode === 'edit') {
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
          {contents?.map((chapter, chapterIdx) => (
            <div key={chapterIdx} className={styles.chapterItem}>
              <div className={styles.chapterHeader}>
                <span className={styles.chapterSeq}>Chapter {chapterIdx + 1}</span>
                <input
                  name={`contents[${chapterIdx}][chapterTitle]`}
                  value={chapter.chapterTitle ?? ''}
                  className={styles.input}
                  type="text"
                  placeholder="챕터 제목을 입력하세요"
                  onChange={handleChapterTitleChange?.(chapterIdx)}
                />
              </div>

              <div className={styles.lessonList}>
                {chapter.lessons.map((lesson, lessonIdx) => (
                  <div key={lessonIdx} className={styles.lessonItem}>
                    <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>
                    <input
                      name={`contents[${chapterIdx}][lessons][${lessonIdx}][title]`}
                      value={lesson.title}
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
                  <Button
                    variant="add"
                    size="sm"
                    type="button"
                    onClick={() => addLesson(chapterIdx)}
                  >
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

  // 보기 모드
  return (
    <div className={styles.container}>
      <div className={styles.chapterList}>
        {contents?.map((chapter, chapterIdx) => (
          <div key={chapterIdx} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterSeq}>Chapter {chapterIdx + 1}</span>
              <h3 className={styles.chapterTitle}>{chapter.chapterTitle}</h3>
            </div>

            <div className={styles.lessonList}>
              {chapter.lessons.map((lesson, lessonIdx) => (
                <div key={lessonIdx} className={styles.lessonItem}>
                  <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonTitle}>{lesson.title}</span>
                    {/* {lesson.resourceUrl && (
                      <a
                        href={lesson.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.lessonLink}
                      >
                        강의 보기
                      </a>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
