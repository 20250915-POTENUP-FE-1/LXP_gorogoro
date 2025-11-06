import CourseItem from "./CourseItem";
import "./CourseList.css";

function CourseList() {
  return (
    <section className="course-list" aria-label="강좌 목록">
      <div className="course-list__grid">
        <CourseItem />
      </div>
    </section>
  );
}

export default CourseList;
