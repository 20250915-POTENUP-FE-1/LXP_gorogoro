import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useState } from 'react';

export default function ReplyInputForm() {
  const [replyContent, setReplyContent] = useState('');
  const handleReplySubmit = () => {
    if (!replyContent.trim()) return;
    console.log('Submitting reply:', replyContent);
    alert('답변이 등록되었습니다 (Mock Action)');
    setReplyContent('');
  };
  return (
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
  );
}
