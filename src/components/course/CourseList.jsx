import CourseItem from "./CourseItem";
import "./CourseList.css";

function CourseList({ courses }) {
  return (
    <section className="course-list" aria-label="강좌 목록">
      <div className="course-list__grid">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default CourseList;
