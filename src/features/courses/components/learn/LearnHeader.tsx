'use client';

import Link from 'next/link';
import styles from './LearnHeader.module.css';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import type { CourseDetailResponse } from '@/features/courses/types';

interface LearnHeaderProps {
  course: CourseDetailResponse;
}

export default function LearnHeader({ course }: LearnHeaderProps) {
  const searchParams = useSearchParams();

  // URL은 "순번"으로 취급 (1부터 시작)
  const currentChapterIdx = Math.max(0, Number(searchParams.get('chapter') ?? 1) - 1);
  const currentLessonIdx = Math.max(0, Number(searchParams.get('lesson') ?? 1) - 1);

  const chapters = course.chapters ?? [];
  const currentChapter = chapters[currentChapterIdx];
  const lessons = currentChapter?.lessons ?? [];
  const currentLesson = lessons[currentLessonIdx];

  const getPrevLesson = () => {
    // 같은 챕터 내 이전 레슨
    if (currentChapter && currentLessonIdx > 0) {
      return { chapter: currentChapterIdx + 1, lesson: currentLessonIdx }; // -1된 값을 1-based로
    }

    // 이전 챕터의 마지막 레슨
    if (currentChapterIdx > 0) {
      const prevChapterIdx = currentChapterIdx - 1;
      const prevLessons = chapters[prevChapterIdx]?.lessons ?? [];
      if (prevLessons.length > 0) {
        return { chapter: prevChapterIdx + 1, lesson: prevLessons.length }; // 마지막 레슨(1-based)
      }
    }

    return null;
  };

  const getNextLesson = () => {
    // 같은 챕터 내 다음 레슨
    if (currentChapter && currentLessonIdx < lessons.length - 1) {
      return { chapter: currentChapterIdx + 1, lesson: currentLessonIdx + 2 }; // +1 후 1-based
    }

    // 다음 챕터의 첫 레슨
    const nextChapterIdx = currentChapterIdx + 1;
    const nextLessons = chapters[nextChapterIdx]?.lessons ?? [];
    if (nextLessons.length > 0) {
      return { chapter: nextChapterIdx + 1, lesson: 1 };
    }

    return null;
  };

  const prevLesson = getPrevLesson();
  const nextLesson = getNextLesson();

  return (
    <div className={styles.actions}>
      <Link href="/courses" style={{ marginRight: 'auto' }}>
        <Button variant="secondary">← Go to Courses</Button>
      </Link>

      <Button variant="secondary">Hide Sidebar</Button>

      {prevLesson ? (
        <Link href={`?chapter=${prevLesson.chapter}&lesson=${prevLesson.lesson}`}>
          <Button variant="secondary">← Previous Lecture</Button>
        </Link>
      ) : (
        <Button variant="secondary" disabled>
          ← Previous Lecture
        </Button>
      )}

      {nextLesson ? (
        <Link href={`?chapter=${nextLesson.chapter}&lesson=${nextLesson.lesson}`}>
          <Button variant="primary">Complete and Continue →</Button>
        </Link>
      ) : (
        <Button variant="primary" disabled>
          Complete and Continue →
        </Button>
      )}
    </div>
  );
}
