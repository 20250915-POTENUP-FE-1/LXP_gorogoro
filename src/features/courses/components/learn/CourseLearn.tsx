'use client';
import VideoCard from './VideoCard';
import QnaPanel from './QnaPanel';
import { CourseDetailResponse, LessonQnaListResponse } from '@/features/courses/types';
import CurriculumSidebar from './CurriculumSidebar';
import styles from './CourseLearn.module.css';
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface CourseLearnProps {
  course: CourseDetailResponse;
  qnaList: LessonQnaListResponse; //{questions:[{},...,{}]}
}
export default function CourseLearn({ course, qnaList }: CourseLearnProps) {
  const qnaItems = qnaList.questions;
  const searchParams = useSearchParams(); // 쿼리스트링 읽기 ?부터
  const lessonId = searchParams.get('lessonId');
  const courseId = course.courseId;
  return (
    <div className={styles.mainLayout}>
      <main>
        <VideoCard />
        <QnaPanel qnaItems={qnaItems} courseId={courseId} />
      </main>
      <CurriculumSidebar course={course} lessonId={lessonId} />
    </div>
  );
}
