'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './EnrollmentItem.module.css';
import { EnrollCourse } from '@/features/courses/types';
import { useResolveCoverSrc } from '@/shared/utils/resolveCoverSrc';

interface EnrollmentItemProps {
  enroll: EnrollCourse;
}

export default function EnrollmentItem({ enroll }: EnrollmentItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        <Image
          width={200}
          height={200}
          className={styles.image}
          src={useResolveCoverSrc(enroll.coverImage)}
          alt={enroll.courseTitle}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{enroll.courseTitle}</h3>
        <p className={styles.instructor}>{enroll.instructorName}</p>
        <div className={styles.progressContainer}>
          <div className={styles.progressLabel}>
            <span>진도율</span>
            <span>50%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `50%` }} />
          </div>
        </div>
      </div>
      <div className={styles.meta}>
        <Link href={`/courses/${enroll.courseId}/learn`} className={styles.action}>
          이어 학습하기
        </Link>
      </div>
    </article>
  );
}
