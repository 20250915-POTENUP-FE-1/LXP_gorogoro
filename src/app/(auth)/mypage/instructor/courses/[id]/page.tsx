import InstructorCourseList from '@/features/intructor/components/InstructorCourseList';
import { getInstructorCourses } from '@/services/course.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강의 관리 상세',
  description: '강의 정보와 구성 요소를 확인하고 운영에 필요한 설정을 점검하세요.',
};

export default async function InstructorCoursePage() {
  const { contents: courses } = await getInstructorCourses();
  return <InstructorCourseList courses={courses} />;
}
