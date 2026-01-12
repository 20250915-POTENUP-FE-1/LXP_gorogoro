'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './EnrollmentItem.module.css';
import { EnrolledCourse } from '../types';
import { Button } from '@/shared/components/ui/Button';

interface EnrollmentItemProps {
  course: EnrolledCourse;
}

export default function EnrollmentItem() {
  const handleCancel = async (enrollmentId?: string) => {
    if (confirm('정말로 수강을 취소하시겠습니까?')) {
      alert('수강 취소 기능은 준비중입니다.');
    }
  };
  const courseId = 1;

  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        {/*<Image className={styles.image} src={} alt={course.courseTitle} />*/}
      </div>
      <div className={styles.body}>
        <div className={styles.category}>강좌 이름</div>
        <h3 className={styles.title}>강좌 타이틀</h3>
        <p className={styles.instructor}>강의자이름</p>
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
        <Link href={`/courses/${courseId}/learn`} className={styles.action}>
          이어 학습하기
        </Link>
        <Button variant="cancel" size="sm" type="button" onClick={() => handleCancel()}>
          수강 취소
        </Button>
      </div>
    </article>
  );
}
