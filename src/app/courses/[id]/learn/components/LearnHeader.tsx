'use client';

import Link from 'next/link';
import styles from './LearnHeader.module.css';
import { useSearchParams } from 'next/navigation';
import { CourseLearn } from '@/features/courses/types';
import { Button } from '@/shared/components/ui/Button';

interface LearnHeaderProps {
  course: CourseLearn;
}

export default function LearnHeader({ course }: LearnHeaderProps) {
  const searchParams = useSearchParams();
  const currentChapterSeq = parseInt(searchParams.get('chapter') || '1');
  const currentLessonSeq = parseInt(searchParams.get('lesson') || '1');

  // 현재 챕터와 레슨 찾기
  const currentChapter = course.contents.find((ch) => ch.seq === currentChapterSeq);
  const currentLessonIndex =
    currentChapter?.lessons.findIndex((l) => l.seq === currentLessonSeq) ?? -1;

  // 이전/다음 레슨 찾기
  const getPrevLesson = () => {
    if (!currentChapter) return null;

    if (currentLessonIndex > 0) {
      const prevLesson = currentChapter.lessons[currentLessonIndex - 1];
      return { chapter: currentChapter.seq, lesson: prevLesson.seq };
    }

    // 이전 챕터의 마지막 레슨
    const prevChapter = course.contents.find((ch) => ch.seq === currentChapterSeq - 1);
    if (prevChapter && prevChapter.lessons.length > 0) {
      const lastLesson = prevChapter.lessons[prevChapter.lessons.length - 1];
      return { chapter: prevChapter.seq, lesson: lastLesson.seq };
    }
    return null;
  };

  const getNextLesson = () => {
    if (!currentChapter) return null;

    if (currentLessonIndex < currentChapter.lessons.length - 1) {
      const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
      return { chapter: currentChapter.seq, lesson: nextLesson.seq };
    }

    // 다음 챕터의 첫 레슨
    const nextChapter = course.contents.find((ch) => ch.seq === currentChapterSeq + 1);
    if (nextChapter && nextChapter.lessons.length > 0) {
      return { chapter: nextChapter.seq, lesson: nextChapter.lessons[0].seq };
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
        <Button variant="secondary" onClick={getNextLesson} disabled>
          ← Previous Lecture
        </Button>
      )}

      {nextLesson ? (
        <Link href={`?chapter=${nextLesson.chapter}&lesson=${nextLesson.lesson}`}>
          <Button variant="primary">Complete and Continue →</Button>
        </Link>
      ) : (
        <Button variant="primary" onClick={getNextLesson}>
          Complete and Continue →
        </Button>
      )}
    </div>
  );
}
