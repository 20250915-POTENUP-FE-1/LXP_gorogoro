import EnrollmentList from "@/features/mypage/components/EnrollmentList";
import { getCourses } from "@/services/course.service";

export default async function EnrollmentPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const courses = await getCourses();

  const coursesCount = courses.length;

  return <EnrollmentList courses={courses} coursesCount={coursesCount} />;
}
