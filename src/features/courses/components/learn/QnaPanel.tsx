import React, { useState } from 'react';
import { ThreadDto } from '../../types';
import styles from './QnaPanel.module.css';

export default function QnaPanel({ qnaData }: { qnaData: ThreadDto[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  if (!qnaData || qnaData.length === 0) {
    return <div className={styles.noQna}>등록된 질문이 없습니다.</div>;
  }

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    // api 호출 로직
    console.log('Submitting reply:', replyContent);
    alert('답변이 등록되었습니다 (Mock Action)');
    setReplyContent('');
  };

  return (
    <div className={styles.qnaList}>
      {qnaData.map((item) => (
        <div key={item.id} className={styles.qnaItem}>
          <div className={styles.qnaHeader} onClick={() => toggleExpand(item.id)}>
            <div className={styles.qnaTitleRow}>
              <span className={styles.qnaTitle}>{item.title}</span>
              <span
                className={`${styles.statusBadge} ${
                  item.status === 'answered' ? styles.statusAnswered : styles.statusPending
                }`}
              >
                {item.status === 'answered' ? '답변완료' : '대기중'}
              </span>
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

          {/* Expanded Replies */}
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
                <div className={styles.replyForm}>
                  <textarea
                    className={styles.replyInput}
                    placeholder="입력하세요."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <div className={styles.replyActions}>
                    <button className={styles.replyButton} onClick={handleReplySubmit}>
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
              {item.replies.length === 0 && (
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>아직 댓글이 없습니다.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
