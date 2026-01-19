import styles from './CourseCurriculumView.module.css';
import { CourseDetailResponse } from '@/features/courses/types';
import Link from 'next/link';

interface CurriculumViewProps {
  course: CourseDetailResponse;
}
export default function CourseCurriculumView({ course }: CurriculumViewProps) {
  const courseId = course.courseId;
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
                <div key={lesson.lessonId} className={styles.lessonItem}>
                  <span className={styles.lessonSeq}>{lessonIdx + 1}.</span>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonTitle}>{lesson.title}</span>
                    <Link
                      href={`/courses/${courseId}/learn?lessonId=${lesson.lessonId}`} // 쿼리 스트링 추가
                      rel="noopener noreferrer"
                      className={styles.lessonLink}
                    >
                      강의 보기
                    </Link>
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
