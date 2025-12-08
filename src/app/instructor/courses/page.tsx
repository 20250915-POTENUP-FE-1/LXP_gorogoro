import InstructorCourseList from "@/features/intructor/components/InstructorCourseList";
import { getCourses } from "@/services/course.service";

export default async function InstructorCoursePage() {
  const courses = await getCourses();
  return <InstructorCourseList courses={courses} />;
}
