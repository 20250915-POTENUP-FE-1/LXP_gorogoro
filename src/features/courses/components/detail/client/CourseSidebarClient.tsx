'use client';
import styles from './CourseSidebar.module.css';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/Button';
import { CourseDetailResponse } from '@/features/courses/types';
import useCourseCartActions from '@/features/courses/hooks/useCourseCartActions';

interface CourseSidebarProps {
  course: CourseDetailResponse;
}
export default function CourseSidebarClient({ course }: CourseSidebarProps) {
  const { pending, add, checkout } = useCourseCartActions(course.courseId);

  return (
    <div>
      <aside className={styles.sidebar}>
        <Image
          className={styles.thumbnail}
          src={course.coverImageUrl}
          alt={course.title}
          width={200}
          height={200}
        />
        <div className={styles.summaryCard}>
          <dl className={styles.meta}>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>난이도</dt>
              <dd className={styles.metaValue}>{course.difficulty}</dd>
            </div>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>1차 카테고리</dt>
              <dd className={styles.metaValue}>{course.categoryDetail.name}</dd>
              <dt className={styles.metaLabel}>2차 카테고리</dt>
              <dd className={styles.metaValue}>
                {course.categoryDetail.subCategoryDetailDto.name}
              </dd>
            </div>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>가격</dt>
              <dd className={styles.metaPrice}>₩{course.price.toLocaleString()}</dd>
            </div>
          </dl>
          <div className={styles.ctaGroup}>
            <Button variant="cta" type="button" onClick={add} disabled={pending}>
              장바구니 담기
            </Button>
            <Button
              variant="cta"
              className={styles.ctaSecondary}
              type="button"
              onClick={checkout}
              disabled={pending}
            >
              바로 결제하기
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
