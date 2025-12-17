import InstructorCourseList from "@/features/intructor/components/InstructorCourseList";
import { getInstructorCourses } from "@/services/course.service";

export default async function InstructorCoursePage() {
  const { contents: courses } = await getInstructorCourses();
  return <InstructorCourseList courses={courses} />;
}
