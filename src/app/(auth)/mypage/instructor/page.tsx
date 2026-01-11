import styles from './page.module.css';
import QnAList from '@/features/instructor/components/QnAList';
import DashboardStats from '@/features/instructor/components/DashboardStats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강사 대시보드',
  description: '강의 운영 현황을 확인하고 강의 개설/수정 등 강사 기능을 관리하세요.',
};

export default function InstructorDashboardPage() {
  // Mock Data
  const stats = [
    { label: '총 강좌 수', value: '12개' },
    { label: '총 수익률', value: '1,250,000원' },
    { label: '총 평점', value: '4.8' },
    { label: '총 수강생', value: '3,450명' },
  ];

  const qnaList = [
    {
      id: '1',
      title: '리액트 훅 사용법에 대해 질문있습니다.',
      author: '김철수',
      date: '2024.12.06',
      courseTitle: '초격차 패키지 : 한 번에 끝내는 React의 기초',
    },
    {
      id: '2',
      title: '강의 자료 다운로드가 안돼요',
      author: '이영희',
      date: '2024.12.05',
      courseTitle: '실전 프로젝트로 배우는 Next.js',
    },
    {
      id: '3',
      title: 'useEffect 의존성 배열 관련 문의',
      author: '박지성',
      date: '2024.12.04',
      courseTitle: '모던 자바스크립트 Deep Dive',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>대시보드</h1>
      <DashboardStats stats={stats} />
      <QnAList items={qnaList} />
    </div>
  );
}
