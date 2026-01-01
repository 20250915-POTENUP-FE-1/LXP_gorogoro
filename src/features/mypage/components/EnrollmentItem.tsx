"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./EnrollmentItem.module.css";
import { EnrolledCourse } from "../types";
import { Button } from "@/shared/components/ui/button/Button";

interface EnrollmentItemProps {
  course: EnrolledCourse;
}

export default function EnrollmentItem({ course }: EnrollmentItemProps) {
  const handleCancel = async (enrollmentId: string) => {
    if (confirm("정말로 수강을 취소하시겠습니까?")) {
      alert("수강 취소 기능은 준비중입니다.");
    }
  };

  const progress = course.progress || 0;

  return (
    <article className={styles.item} key={course.courseTitle}>
      <div className={styles.thumbnail}>
        <Image
          className={styles.image}
          src={course.coverImageUrl}
          alt={course.courseTitle}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.category}>{course.categoryName}</div>
        <h3 className={styles.title}>{course.courseTitle}</h3>
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
        <Link
          href={`/courses/${course.courseId}/learn`}
          className={styles.action}
        >
          이어 학습하기
        </Link>
        <Button
          variant="cancel"
          size="sm"
          type="button"
          onClick={() => handleCancel(course.enrollmentId)}
        >
          수강 취소
        </Button>
      </div>
    </article>
  );
}
