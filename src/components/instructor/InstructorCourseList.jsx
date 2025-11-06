import InstructorCourseItem from "./InstructorCourseItem";
import "./InstructorCourseList.css";

function InstructorCourseList() {
  return (
    <section className="instructor-course-list" aria-label="내가 생성한 강좌">
      <header className="instructor-course-list__header">
        <h1 className="instructor-course-list__title">내가 생성한 강좌</h1>
        <span className="instructor-course-list__count">총 4개의 강좌</span>
      </header>
      <div className="instructor-course-list__items">
        <InstructorCourseItem />
      </div>
    </section>
  );
}

export default InstructorCourseList;
