import styles from './CourseRequest.module.css';
import { CourseDetailResponse, Qna } from '@/features/courses/types';
interface CourseRequestProps {
  course: CourseDetailResponse & Qna; // MOCK DATA TYPE: Qna
}

export default function CourseRequest({ course }: CourseRequestProps) {
  return (
    <div className={styles.qnaSection}>
      <h2 className={styles.sectionTitle}>문의</h2>
      {course.qna && course.qna.length > 0 ? (
        <div className={styles.qnaList}>
          {course.qna.map((item) => (
            <div key={item.id} className={styles.qnaItem}>
              <div className={styles.qnaHeader}>
                <span className={styles.qnaTitle}>{item.title}</span>
                <span
                  className={`${styles.qnaStatus} ${
                    item.status === 'answered' ? styles.qnaAnswered : styles.qnaPending
                  }`}
                >
                  {item.status === 'answered' ? '답변완료' : '대기중'}
                </span>
              </div>
              <div className={styles.qnaBody}>
                <p className={styles.qnaQuestion}>
                  <strong>{item.userName}</strong> - {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className={styles.qnaContent}>{item.content}</p>
                <div className={styles.answerList}>
                  {item.answer && (
                    <div className={styles.qnaAnswer}>
                      <strong>답변:</strong> {item.answer}
                      {item.answeredAt && (
                        <span className={styles.answerDate}>
                          {' '}
                          ({new Date(item.answeredAt).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.replyForm}>
                  <textarea className={styles.replyInput} placeholder="답변을 입력하세요..." />
                  <div className={styles.replyActions}>
                    <button className={styles.replyButton}>답변 등록</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.placeholder}>
          <p>아직 문의가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
