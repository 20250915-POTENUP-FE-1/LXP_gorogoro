import { ChapterDto, LessonDto } from '../../types';
import styles from './CurriculumSidebar.module.css';
export default function CurriculumSidebar({
  chapters,
  activeLessonId,
  onLessonSelect,
}: {
  chapters: ChapterDto[];
  activeLessonId: number;
  onLessonSelect: (lesson: LessonDto) => void;
}) {
  const totalChapters = chapters.length;
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Course Curriculum</h3>
        <p className={styles.sidebarSummary}>
          {totalChapters} Chapters • {totalLessons} Lessons
        </p>
      </div>
      <div className={styles.chapterList}>
        {chapters.map((chapter) => (
          <div key={chapter.chapterId}>
            <div className={styles.chapterHeader}>{chapter.title}</div>
            <ul className={styles.lessonList}>
              {chapter.lessons.map((lesson) => (
                <li
                  key={lesson.lessonId}
                  className={`${styles.lessonItem} ${
                    activeLessonId === lesson.lessonId ? styles.activeLesson : ''
                  }`}
                  onClick={() => onLessonSelect(lesson)}
                >
                  <span>{lesson.title}</span>
                  <span className={styles.lessonDuration}>05:30</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
