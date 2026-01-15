'use client';
import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useState } from 'react';

export default function ReplyInputForm() {
  const [replyContent, setReplyContent] = useState('');
  const handleReplySubmit = () => {};
  return (
    <form className={styles.replyForm}>
      <textarea
        className={styles.replyInput}
        placeholder="입력하세요."
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
      />
      <div className={styles.replyActions}>
        <button type="submit" className={styles.replyButton} onClick={handleReplySubmit}>
          Post Reply
        </button>
      </div>
    </form>
  );
}
