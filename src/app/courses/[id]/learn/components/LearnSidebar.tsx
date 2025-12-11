"use client";

import styles from "./LearnSidebar.module.css";
import { Course } from "@/features/courses/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface LearnSidebarProps {
  course: Course;
}

export default function LearnSidebar({ course }: LearnSidebarProps) {
  const searchParams = useSearchParams();
  const currentChapterSeq = searchParams.get("chapter");
  const currentLessonSeq = searchParams.get("lesson");

  // 간단한 진행률 계산 (실제로는 서버에서 받아와야 함)
  const totalLessons = course.contents.reduce(
    (sum, ch) => sum + ch.lessons.length,
    0
  );
  const completedLessons = 0; // TODO: 실제 완료 정보는 서버에서 받아와야 함
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className={styles.container}>
      <div className={styles.courseHeader}>
        <div className={styles.courseTitle}>{course.title}</div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className={styles.progressText}>{progress}% complete</div>
      </div>

      <div className={styles.chapterList}>
        {course.contents.map((chapter) => (
          <div key={chapter.seq} className={styles.chapterItem}>
            <div className={styles.chapterHeader}>{chapter.chapterTitle}</div>
            <ul className={styles.lectureList}>
              {chapter.lessons.map((lesson) => {
                const isActive =
                  currentChapterSeq === String(chapter.seq) &&
                  currentLessonSeq === String(lesson.seq);

                return (
                  <li key={lesson.seq} className={styles.lectureItem}>
                    <Link
                      href={`?chapter=${chapter.seq}&lesson=${lesson.seq}`}
                      className={`${styles.lectureLink} ${
                        isActive ? styles.lectureItemActive : ""
                      }`}
                    >
                      <div className={styles.checkbox}>
                        {/* TODO: 완료 상태 체크 */}
                      </div>
                      <div>
                        <div>{lesson.title}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
