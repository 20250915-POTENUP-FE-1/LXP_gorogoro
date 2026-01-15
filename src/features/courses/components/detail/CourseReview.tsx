import styles from './CourseReview.module.css';
import { ReviewListResponse } from '@/features/courses/types';

interface CourseReviewProps {
  reviews: ReviewListResponse;
}
export default function CourseReview({ reviews: { reviews: items } }: CourseReviewProps) {
  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.sectionTitle}>리뷰</h2>
      {items && items.length > 0 ? (
        <div className={styles.reviewList}>
          {items.map((review) => (
            <div key={review.reviewId} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewAuthor}>{review.userNickname}</span>
                <span className={styles.reviewRating}>⭐ {review.rating}</span>
                <br />
                <span className={styles.reviewDate}>{review.createdAt}</span>
              </div>
              <p className={styles.reviewContent}>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.placeholder}>
          <p>아직 리뷰가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
