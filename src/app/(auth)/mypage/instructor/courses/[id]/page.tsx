import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '강의 관리 상세',
  description: '강의 정보와 구성 요소를 확인하고 운영에 필요한 설정을 점검하세요.',
};

export default async function InstructorCoursePage() {
  redirect('/mypage/instructor/courses');
  // return <div></div>;
}
