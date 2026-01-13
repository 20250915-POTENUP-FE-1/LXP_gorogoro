import React, { useState } from 'react';
import { ThreadDto } from '../../types';
import styles from './QnaPanel.module.css';
import QuestionInputForm from '@/features/courses/components/learn/QuestionInputForm';
import ReplyInputForm from '@/features/courses/components/learn/ReplyInputForm';

export default function QnaPanel({ qnaData }: { qnaData: ThreadDto[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const hasQna = !!qnaData && qnaData.length > 0;

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <QuestionInputForm />

      {!hasQna ? (
        <div className={styles.noQna}>등록된 질문이 없습니다.</div>
      ) : (
        <div className={styles.qnaList}>
          {qnaData.map((item) => (
            <div key={item.id} className={styles.qnaItem}>
              <div className={styles.qnaHeader} onClick={() => toggleExpand(item.id)}>
                <div className={styles.qnaTitleRow}>
                  <span className={styles.qnaTitle}>{item.title}</span>
                  <span
                    className={`${styles.statusBadge} ${
                      item.status === 'ANSWERED' ? styles.statusAnswered : styles.statusPending
                    }`}
                  >
                    {item.status === 'ANSWERED' ? '답변완료' : '대기중'}
                  </span>
                </div>
                <div className={styles.qnaContentRow}>
                  <span className={styles.qnaContent}>{item.content}</span>
                </div>
                <div className={styles.qnaMeta}>
                  <span style={{ fontWeight: 500 }}>{item.author.name}</span>
                  {item.author.role === 'instructor' && (
                    <span className={styles.instructorBadge}>Instructor</span>
                  )}
                  <span>• {item.createdAt}</span>
                  <span>• 댓글 {item.replies.length}개</span>
                </div>
              </div>

              {expandedId === item.id && (
                <div className={styles.repliesSection}>
                  <div>
                    {item.replies.map((reply) => (
                      <div key={reply.id} className={styles.replyCard}>
                        <div className={styles.replyHeader}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <strong style={{ color: '#111827' }}>{reply.author.name}</strong>
                            {reply.author.role === 'instructor' && (
                              <span className={styles.instructorBadge}>Instructor</span>
                            )}
                          </div>
                          <span>{reply.createdAt}</span>
                        </div>
                        <div className={styles.replyContent}>{reply.content}</div>
                      </div>
                    ))}
                    <ReplyInputForm />
                  </div>

                  {item.replies.length === 0 && (
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>아직 댓글이 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
