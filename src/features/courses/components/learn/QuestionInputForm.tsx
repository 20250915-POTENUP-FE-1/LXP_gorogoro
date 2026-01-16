'use client';
import styles from '@/features/courses/components/learn/QnaPanel.module.css';
import React, { useActionState, useEffect } from 'react';
import Input from '@/shared/components/ui/Input';
import Textarea from '@/shared/components/ui/Textarea';
import { questionAction } from '@/features/courses/actions/question.action';
import { QuestionFormData } from '@/features/courses/types';
import { useModalStore } from '@/stores/useModalStore';

interface QuestionInputFormProps {
  courseId: number;
  lessonId: number;
}
const initialState: ActionState<QuestionFormData> = {
  success: false,
  message: '',
  errors: {},
  data: {
    title: '',
    content: '',
  },
};

export default function QuestionInputForm({ courseId, lessonId }: QuestionInputFormProps) {
  const postQuestionWithIds = questionAction.bind(null, courseId, lessonId);
  const [state, formAction, isPending] = useActionState(postQuestionWithIds, initialState);
  const { openModal } = useModalStore();

  // 질문 생성 성공시
  useEffect(() => {
    if (state.success === true) {
      openModal({
        title: '질문 등록 성공',
        message: state.message || '질문이 등록되었습니다.',
        onConfirm: () => {},
      });
    }
  }, [state, openModal]);

  // 질문 생성 실패시
  useEffect(() => {
    if (!state.success && state.message) {
      openModal({
        title: '질문 등록 실패',
        message: state.message || '질문이 등록되지 않았습니다.',
        onConfirm: () => {},
      });
    }
  }, [state, openModal]);

  return (
    <form action={formAction}>
      <div className={styles.inputSection}>
        <Input
          type="text"
          className={styles.questionTitleInput}
          placeholder="제목을 입력하세요."
          name="questionTitle"
        />
        {state.errors?.title && <p>{state.errors.title}</p>}
        <Textarea
          className={styles.questionTextInput}
          placeholder="질문 내용을 입력하세요."
          rows={3}
          name="questionContent"
        />
        {state.errors?.content && <p>{state.errors.content}</p>}
        {state.message && <p>{state.message}</p>}

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitButton} disabled={isPending}>
            {isPending ? '저장 중...' : '게시글 등록'}
          </button>
        </div>
      </div>
    </form>
  );
}
