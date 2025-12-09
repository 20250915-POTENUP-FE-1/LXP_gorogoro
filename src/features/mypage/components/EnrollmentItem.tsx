"use client";

import Link from "next/link";
import styles from "./EnrollmentItem.module.css";

export default function EnrollmentItem({ course }: any) {
  const handleCancel = async (courseId: string) => {
    if (confirm("정말로 수강을 취소하시겠습니까?")) {
      alert("수강 취소 기능은 준비중입니다.");
    }
  };

  const progress = course.progress || 0;

  return (
    <article className={styles.item} key={course.title}>
      <div className={styles.thumbnail}>
        <img
          className={styles.image}
          src={course.coverImageUrl}
          alt={course.title}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.category}>{course.category}</div>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructorName}</p>
        <div className={styles.progressContainer}>
          <div className={styles.progressLabel}>
            <span>진도율</span>
            <span>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className={styles.meta}>
        <Link href={`/courses/${course.id}/learn`} className={styles.action}>
          이어 학습하기
        </Link>
        <button
          className={`${styles.action} ${styles.actionSecondary}`}
          type="button"
          onClick={() => handleCancel(course.id)}
        >
          수강 취소
        </button>
      </div>
    </article>
  );
}
