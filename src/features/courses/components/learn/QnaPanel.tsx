'use client';
import React, { useEffect, useState } from 'react';
import styles from './QnaPanel.module.css';
import QuestionInputForm from '@/features/courses/components/learn/QuestionInputForm';
import { LessonQnaItemDto, QnaThreadResponse } from '../../types';
import ReplyInputForm from '@/features/courses/components/learn/ReplyInputForm';
import { useParams, useSearchParams } from 'next/navigation';
import { getQnaThread } from '@/services/course.service';

interface QnaPanelProps {
  qnaItems: LessonQnaItemDto[];
}

export default function QnaPanel({ qnaItems }: QnaPanelProps) {
  const [expendedQuestionId, setExpendedQuestionId] = useState<number | null>(null);
  const [threads, setThreads] = useState<QnaThreadResponse | null>(null);
  const hasQna = !!qnaItems && qnaItems.length > 0;

  const { courseId: courseIdStr } = useParams<{ courseId: string }>();
  const courseId = Number(courseIdStr);

  const searchParams = useSearchParams(); //쿼리스트링 읽기 ?부터
  const lessonId = Number(searchParams.get('lessonId'));

  // 클릭 토글 규칙: 같은 질문이면 닫고, 다른 질문이면 열기
  const handleClickQuestion = (questionId: number) => {
    setExpendedQuestionId((prev) => (prev === questionId ? null : questionId));
  };

  useEffect(() => {
    //초기화와 fetch 로직을 하나로 묶음
    const fetchThread = async () => {
      if (expendedQuestionId === null) {
        setThreads(null);
        return;
      }
      try {
        const data = await getQnaThread(courseId, lessonId, expendedQuestionId);
        setThreads(data);
      } catch (error) {
        console.error(`QnA 스레드 조회 실패: `, error);
      }
    };
    fetchThread();
  }, [courseId, lessonId, expendedQuestionId]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>Q&amp;A</h3>
      </div>

      <QuestionInputForm courseId={courseId} lessonId={lessonId} />

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

                {isOpen && threads && (
                  <div className={styles.threadContent}>
                    {threads.questions?.map((thread) => (
                      <div
                        key={thread.questionId}
                        className={`${styles.threadItem} ${
                          thread.isRoot ? styles.threadRoot : styles.threadReply
                        }`}
                      >
                        <div className={styles.threadMeta}>
                          <span className={styles.threadTitle}>{thread.title}</span>
                          <br />
                          <span className={styles.threadBody}>{thread.content}</span>
                          <br />
                          <span className={styles.threadAuthor}>{thread.authorNickname}</span>
                          <br />
                          <span className={styles.threadDate}>{thread.createdAt}</span>
                        </div>
                      </div>
                    ))}
                    <ReplyInputForm
                      courseId={courseId}
                      lessonId={lessonId}
                      questionId={expendedQuestionId}
                    />
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
