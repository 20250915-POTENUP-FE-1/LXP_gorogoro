import "./InstructorCourseList.css";

export default async function InstructorCourseList() {
  const courses = [
    { id: 1, title: "하이" },
    { id: 2, title: "바이" },
  ];
  return (
    <section className="instructor-course-list" aria-label="내가 생성한 강좌">
      <header className="instructor-course-list__header">
        <h1 className="instructor-course-list__title">내가 생성한 강좌</h1>
        <span className="insIntructor-course-list__count">
          총 {courses.length}개의 강좌
        </span>
      </header>
      <div className="instructor-course-list__items">
        {/* {courses.map((course) => (
          <InstructorCourseItem
            key={course.id}
            course={course}
            setCourses={setCourses}
          />
        ))} */}
      </div>
    </section>
  );
}
