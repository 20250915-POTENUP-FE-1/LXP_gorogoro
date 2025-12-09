import InstructorCourseList from "@/features/intructor/components/InstructorCourseList";
import { getCourses } from "@/services/course.service";

export default async function InstructorCoursePage() {
  //서비스 함수를 통해서 데이터 불러오는 작업 필요
  const courses = await getCourses();
  return <InstructorCourseList courses={courses} />;
}
