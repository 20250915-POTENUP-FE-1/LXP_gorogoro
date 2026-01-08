import InstructorCourseList from '@/features/intructor/components/InstructorCourseList';
import { getInstructorCourses } from '@/services/course.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 강의 관리',
  description: '내가 개설한 강의 목록을 확인하고 상태, 구성, 콘텐츠를 관리하세요.',
};

export default async function InstructorCoursePage() {
  const { contents: courses } = await getInstructorCourses();
  return <InstructorCourseList courses={courses} />; // courses: [{ },{ },..,{ }]
}
