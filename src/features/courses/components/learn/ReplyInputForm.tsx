'use client';
import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useActionState, useEffect } from 'react';
import Textarea from '@/shared/components/ui/Textarea';
import { Button } from '@/shared/components/ui/Button';
import { replyAction } from '@/features/courses/actions/reply.action';
import { ReplyFormData } from '@/features/courses/types';
import { useModalStore } from '@/stores/useModalStore';

interface ReplyInputFormProps {
  courseId: number;
  lessonId: number;
  questionId: number;
}
const initialState: ActionState<ReplyFormData> = {
  success: false,
  message: '',
  errors: {},
  data: {
    content: '',
  },
};

export default function ReplyInputForm({ courseId, lessonId, questionId }: ReplyInputFormProps) {
  const replyWithIds = replyAction.bind(null, courseId, lessonId, questionId);
  const [state, formAction, isPending] = useActionState(replyWithIds, initialState);
  const { openModal } = useModalStore();

  // 답변 입력 성공시
  useEffect(() => {
    if (state.success === true) {
      openModal({
        title: '답변 입력 성공',
        message: '답글을 달았습니다.',
      });
    }
  }, [state.success, openModal]);

  // 답변 입력 실패시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: '답변 입력 실패',
        message: '답변 입력에 실패했습니다.',
      });
    }
  }, [state.success, state.message, openModal]);

  return (
    <form className={styles.replyForm} action={formAction}>
      <Textarea className={styles.replyInput} placeholder="답변을 입력하세요." name="content" />
      <div className={styles.replyActions}>
        <Button type="submit" variant={'reply'} disabled={isPending}>
          답변 등록
        </Button>
      </div>
    </form>
  );
}
