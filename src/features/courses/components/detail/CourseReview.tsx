import styles from './CourseDetail.module.css';
import { CourseDetailResponse } from '@/features/courses/types';

interface CourseReviewProps {
  course: CourseDetailResponse;
}
export default function CourseReview({ course }: CourseReviewProps) {
  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.sectionTitle}>리뷰</h2>
      {/*{course.reviews && course.reviews.length > 0 ? (*/}
      {/*  <div className={styles.reviewList}>*/}
      {/*    {course.reviews.map((review) => (*/}
      {/*      <div key={review.id} className={styles.reviewItem}>*/}
      {/*        <div className={styles.reviewHeader}>*/}
      {/*          <span className={styles.reviewAuthor}>{review.userName}</span>*/}
      {/*          <span className={styles.reviewRating}>⭐ {review.rating}</span>*/}
      {/*          <span className={styles.reviewDate}>*/}
      {/*            {new Date(review.createdAt).toLocaleDateString()}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*        <p className={styles.reviewContent}>{review.content}</p>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className={styles.placeholder}>*/}
      {/*    <p>아직 리뷰가 없습니다.</p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
