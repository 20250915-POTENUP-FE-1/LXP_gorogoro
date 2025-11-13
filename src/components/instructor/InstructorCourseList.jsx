import InstructorCourseItem from "./InstructorCourseItem";
import "./InstructorCourseList.css";

import { Link, useOutletContext } from "react-router-dom";

function InstructorCourseList() {
  const { courses, setCourses, loading, error } = useOutletContext();

  const renderState = (message, showCta = false) => (
    <section className="instructor-course-list instructor-course-list--state">
      <p className="instructor-course-list__message">{message}</p>
      {showCta && (
        <Link to="courses/create" className="instructor-course-list__cta">
          첫 강좌 만들기
        </Link>
      )}
    </section>
  );

  if (loading) {
    return renderState("강좌 정보를 불러오는 중입니다…");
  }

  if (error) {
    return renderState(error, true);
  }

  if (!courses || courses.length === 0) {
    return renderState("아직 등록된 강좌가 없습니다.", true);
  }

  return (
    <>
      {courses && (
        <section
          className="instructor-course-list"
          aria-label="내가 생성한 강좌"
        >
          <header className="instructor-course-list__header">
            <h1 className="instructor-course-list__title">내가 생성한 강좌</h1>
            <span className="instructor-course-list__count">
              총 {courses.length}개의 강좌
            </span>
          </header>
          <div className="instructor-course-list__items">
            {courses.map((course) => (
              <InstructorCourseItem
                key={course.id}
                course={course}
                setCourses={setCourses}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default InstructorCourseList;
