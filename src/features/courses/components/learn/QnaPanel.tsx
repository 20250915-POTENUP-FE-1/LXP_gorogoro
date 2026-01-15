'use client';
import React, { useEffect, useState } from 'react';
import styles from './QnaPanel.module.css';
import QuestionInputForm from '@/features/courses/components/learn/QuestionInputForm';
import { LessonQnaItemDto, QnaThreadResponse } from '../../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_QNA_THREAD } from '@/app/mockData';
import { getQnaThread } from '@/services/course.service';

interface QnaPanelProps {
  qnaItems: LessonQnaItemDto[];
}

export default function QnaPanel({ qnaItems }: QnaPanelProps) {
  const [expendedQuestionId, setExpendedQuestionId] = useState<number | null>(null);
  const [thread, setThread] = useState<QnaThreadResponse | null>(null);
  const hasQna = !!qnaItems && qnaItems.length > 0;

  // useSearchParams / useRouter 로 가능

  // 클릭 토글 규칙: 같은 질문이면 닫고, 다른 질문이면 열기
  const handleClickQuestion = (questionId: number) => {
    setExpendedQuestionId((prev) => (prev === questionId ? null : questionId));
  };

  useEffect(() => {
    if (expendedQuestionId === null) {
      setThread(null);
      return;
    }
    // api
    // const fetchThread = async () => {
    //   const data = await getQnaThread(courseId, lessonId, expendedQuestionId);
    //   setThread(data);
    // };
    // fetchThread();
    // MOCK DATA
    const data = MOCK_QNA_THREAD[expendedQuestionId];
    setThread(data);
  }, [expendedQuestionId]);
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Q&amp;A</h3>
      </div>

      <QuestionInputForm />

      {!hasQna ? (
        <div className={styles.noQna}>등록된 질문이 없습니다.</div>
      ) : (
        <div className={styles.qnaList}>
          {qnaItems.map((item) => {
            const isOpen = expendedQuestionId === item.questionId;
            return (
              <div key={item.questionId} className={styles.qnaItem}>
                <button
                  type="button"
                  className={styles.qnaHeader}
                  onClick={() => handleClickQuestion(item.questionId)}
                >
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
                  <div className={styles.qnaMeta}>
                    <span className={styles.author}>{item.authorNickname}</span>
                    <span>• 댓글 {item.replyCount}개</span>
                    <span className={styles.date}>{item.lastActivityAt}</span>
                  </div>
                </button>

                {isOpen && thread && (
                  <div className={styles.threadContent}>
                    {thread.questions?.map((q) => (
                      <div
                        key={q.questionId}
                        className={`${styles.threadItem} ${
                          q.isRoot ? styles.threadRoot : styles.threadReply
                        }`}
                      >
                        <div className={styles.threadMeta}>
                          <span className={styles.threadTitle}> {q.title}</span>
                          <span className={styles.threadBody}>{q.content}</span>
                          <span className={styles.threadAuthor}>{q.authorNickname}</span>
                          <span className={styles.threadDate}>{q.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
