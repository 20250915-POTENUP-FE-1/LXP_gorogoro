'use client';
import styles from './CourseCurriculumView.module.css';

export default function CourseCurriculumView({ course }) {
  return (
    <div className={styles.curriculumSection}>
      <h1 className={styles.sectionTitle}>커리큘럼</h1>
      <div className={styles.chapterList}>
        {course.chapters?.map((chapter, chapterIdx) => (
          <div key={chapter.chapterId ?? chapterIdx} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>
              <span className={styles.chapterSeq}>Chapter {chapterIdx + 1}</span>
              <h3 className={styles.chapterTitle}>{chapter.title}</h3>
            </div>

            <div className={styles.lessonList}>
              {chapter.lessons.map((lesson, lessonIdx) => (
                <div key={lesson.lessonId ?? lessonIdx} className={styles.lessonItem}>
                  <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonTitle}>{lesson.title}</span>
                    {lesson.resourceUrl && (
                      <a
                        href={lesson.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.lessonLink}
                      >
                        강의 보기
                      </a>
                    )}
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
