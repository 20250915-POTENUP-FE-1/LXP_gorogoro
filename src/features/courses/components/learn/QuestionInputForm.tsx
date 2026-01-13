import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useState } from 'react';

export default function QuestionInputForm() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const handleQuestionSubmit = () => {
    if (!questionText.trim()) return;
    setQuestionText('');
    setQuestionTitle('');
  };
  return (
    <div className={styles.inputSection}>
      <input
        className={styles.questionTitleInput}
        placeholder="제목을 입력하세요"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
      />
      <textarea
        className={styles.questionTextInput}
        placeholder="질문 내용을 입력하세요"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        rows={3}
      />
      <div className={styles.buttonWrapper}>
        <button
          className={styles.submitButton}
          onClick={handleQuestionSubmit}
          disabled={!questionText.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
