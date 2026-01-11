'use client';
import styles from './CourseTabs.module.css';
import CourseTabs from '@/features/courses/components/detail/CourseTabs';
import { useState } from 'react';
import CourseDescription from '@/features/courses/components/detail/CourseDescription';
import CourseReview from '@/features/courses/components/detail/CourseReview';
import CourseRequest from '@/features/courses/components/detail/CourseRequest';
import CourseCurriculumView from '@/features/courses/components/detail/CourseCurriculumView';
import { CourseDetailResponse, Qna, Reviews, TabKey } from '@/features/courses/types';

interface CourseTabsSectionProps {
  course: CourseDetailResponse & Reviews & Qna;
}
export default function CourseTabsSectionClient({ course }: CourseTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('description');

  return (
    <>
      <CourseTabs activeTab={activeTab} handleChangeTab={setActiveTab} />
      <section className={styles.section}>
        {activeTab === 'description' && <CourseDescription course={course} />}
        {activeTab === 'curriculum' && <CourseCurriculumView course={course} />}
        {activeTab === 'review' && <CourseReview course={course} />}
        {activeTab === 'request' && <CourseRequest course={course} />}
      </section>
    </>
  );
}
