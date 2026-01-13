'use client';
import { useState } from 'react';
import { CourseLearnPageModel } from '@/features/courses/types';
import VideoCard from './VideoCard';
import OverviewPanel from './OverviewPanel';
import QnaPanel from './QnaPanel';
import { LessonDto } from '@/features/courses/types';
import CurriculumSidebar from './CurriculumSidebar';
import styles from './CourseLearn.module.css';

export default function CourseLearn({ data }: { data: CourseLearnPageModel }) {
  const [activeLesson, setActiveLesson] = useState<LessonDto>(data.activeLesson);
  const [activeTab, setActiveTab] = useState<'overview' | 'qna'>('overview');

  // Filter QnA by activeLessonId
  const lessonQna = data.qna.filter((t) => t.lessonId === activeLesson.lessonId);

  return (
    <div className={styles.mainLayout}>
      {/* LEFT: Main Content */}
      <main>
        <VideoCard lessonTitle={activeLesson.title} />

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'qna' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('qna')}
          >
            Q&A ({lessonQna.length})
          </button>
        </div>

        {activeTab === 'overview' ? (
          <OverviewPanel lessonTitle={activeLesson.title} />
        ) : (
          <QnaPanel qnaData={lessonQna} />
        )}
      </main>

      {/* RIGHT: Sidebar */}
      <CurriculumSidebar
        chapters={data.chapters}
        activeLessonId={activeLesson.lessonId}
        onLessonSelect={setActiveLesson}
      />
    </div>
  );
}
