import EnrollmentList from '@/features/mypage/components/EnrollmentList';
import { getMyEnrollments } from '@/services/course.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '수강 내역',
  description: '수강 중인 강의와 완료한 강의를 확인하고 학습 기록을 관리하세요.',
};

export default async function EnrollmentPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const { contents: enrolledCourses } = await getMyEnrollments();
  const coursesCount = enrolledCourses.length;

  return <EnrollmentList courses={enrolledCourses} coursesCount={coursesCount} />;
}
