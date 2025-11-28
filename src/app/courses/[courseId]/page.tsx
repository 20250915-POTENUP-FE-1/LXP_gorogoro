import courseAPI from "@/api/courseAPI";
import CourseDetail from "@/features/courses/components/CourseDetail";

import "./CourseDetailPage.css";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await courseAPI.getCourseById(courseId);

  return (
    <main className="course-detail-page">
      <div className="page-wrapper course-detail-page__container">
        <CourseDetail course={course} />
      </div>
    </main>
  );
}
