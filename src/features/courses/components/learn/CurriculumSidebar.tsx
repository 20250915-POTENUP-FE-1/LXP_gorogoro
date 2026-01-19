import { CourseDetailResponse } from '../../types';
import styles from './CurriculumSidebar.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface CurriculumSidebarProps {
  course: CourseDetailResponse;
}
export default function CurriculumSidebar({ course }: CurriculumSidebarProps) {
  const chapters = course.chapters;
  const router = useRouter();
  const searchParams = useSearchParams(); //쿼리스트링 읽기 ?부터

  const lessonIdFromUrl = searchParams.get('lessonId');
  const firstLessonId = String(course.chapters[0].lessons[0].lessonId);
  const activeLessonId = lessonIdFromUrl || firstLessonId;

  const totalChapters = course.chapters.length ?? 0;
  const lessonArray = course.chapters.map((ch) => ch.lessons.length) ?? [];
  const lessonArraySum = lessonArray.reduce((a, r) => a + r, 0);

  const handleLessonSelect = (lessonId: number) => {
    // 기존 쿼리 파라미터를 유지하면서 lessonId 만 교체
    const params = new URLSearchParams(searchParams.toString()); //쿼리스트링 조작하기
    params.set('lessonId', lessonId.toString());
    // URL 변경(페이지 전체 새로고침 없이 URL 만 업데이트)
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Course Curriculum</h3>
        <p className={styles.sidebarSummary}>
          {totalChapters} Chapters • {lessonArraySum} Lessons
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
                    activeLessonId === String(lesson.lessonId) ? styles.activeLesson : ''
                  }`}
                  onClick={() => handleLessonSelect(lesson.lessonId)}
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
