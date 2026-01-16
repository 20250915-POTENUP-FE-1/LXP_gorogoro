'use client';
import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useState } from 'react';
import Textarea from '@/shared/components/ui/Textarea';
import { Button } from '@/shared/components/ui/Button';

export default function ReplyInputForm() {
  return (
    <form className={styles.replyForm}>
      <Textarea
        className={styles.replyInput}
        placeholder="답변을 입력하세요."
        name="replyContent"
      />
      <div className={styles.replyActions}>
        <button type="submit" className={styles.replyButton}>
          답변 등록
        </button>
      </div>
    </form>
  );
}
