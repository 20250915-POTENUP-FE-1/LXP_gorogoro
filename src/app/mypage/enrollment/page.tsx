import EnrollmentItem from "@/features/mypage/components/EnrollmentItem";
import "./EnrollmentList.css";

export default async function EnrollmentPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  // enroll 데이터 테이블에서 수강 신청한 enroll 객체 배열 조회
  // enrollments.map(enroll.courseId) => getCourseById(courseId)
  // Promise.all() 해서 병렬로 처리
  // 기억 나시쥬?

  // const enrollments = await getEnrollments(userId);
  // const coursePromises = enrollments.map((enroll) =>
  //   getCourseById(enroll.courseId)
  // );
  // const courses = await Promise.all(coursePromises);

  const courses = [{ id: 1, title: "hi" }, { id: 2 }];
  const coursesCount = courses.length;

  return (
    <section className="enrollment-list" aria-label="수강 중인 강좌">
      <header className="enrollment-list__header">
        <h1 className="enrollment-list__title">내가 수강 중인 강좌</h1>
        <span className="enrollment-list__count">
          총 {coursesCount} 개의 강좌
        </span>
      </header>
      <div className="enrollment-list__items">
        {/* {courses.map((course: any) => (
          <EnrollmentItem key={course.id} course={course} />
        ))} */}
      </div>
    </section>
  );
}
