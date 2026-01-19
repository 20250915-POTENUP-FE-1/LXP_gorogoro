'use client';
import VideoCard from './VideoCard';
import QnaPanel from './QnaPanel';
import { CourseDetailResponse, LessonQnaListResponse } from '@/features/courses/types';
import CurriculumSidebar from './CurriculumSidebar';
import styles from './CourseLearn.module.css';
import React from 'react';

interface CourseLearnProps {
  course: CourseDetailResponse;
  qnaList: LessonQnaListResponse; //{questions:[{},...,{}]}
}
export default function CourseLearn({ course, qnaList }: CourseLearnProps) {
  const qnaItems = qnaList.questions;

  return (
    <div className={styles.mainLayout}>
      <main>
        <VideoCard />
        <QnaPanel qnaItems={qnaItems} />
      </main>
      <CurriculumSidebar course={course} />
    </div>
  );
}
