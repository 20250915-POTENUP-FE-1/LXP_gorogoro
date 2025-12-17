import EnrollmentList from "@/features/mypage/components/EnrollmentList";
import { getMyEnrollments } from "@/services/course.service";

export default async function EnrollmentPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const { contents: enrolledCourses } = await getMyEnrollments();

  const coursesCount = enrolledCourses.length;

  return (
    <EnrollmentList courses={enrolledCourses} coursesCount={coursesCount} />
  );
}
