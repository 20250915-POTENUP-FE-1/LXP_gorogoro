import styles from './CourseDetail.module.css';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/Button';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseSidebarProps {
  course: CourseDetailResponse;
  onAddToCart: () => void;
  onCheckout: () => void;
}
export default function CourseSidebar({ course, onAddToCart, onCheckout }: CourseSidebarProps) {
  return (
    <div>
      <aside className={styles.sidebar}>
        <Image className={styles.thumbnail} src={course.coverImageUrl} alt={course.title} />
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
            <Button variant="cta" type="button" onClick={onAddToCart}>
              <Image
                className={styles.ctaIcon}
                src="/assets/shopping-cart.svg"
                alt=""
                aria-hidden="true"
              />
              장바구니 담기
            </Button>
            <Button
              variant="cta"
              className={styles.ctaSecondary}
              type="button"
              onClick={onCheckout}
            >
              바로 결제하기
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
