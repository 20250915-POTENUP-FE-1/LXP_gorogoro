import EnrollmentItem from "./EnrollmentItem";
import "./EnrollmentList.css";
import { useOutletContext } from "react-router";

function EnrollmentList() {
  const { enrolls, courses } = useOutletContext();
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
        {courses &&
          courses.map((course) => (
            <EnrollmentItem key={course.id} course={course} />
          ))}
      </div>
    </section>
  );
}

export default EnrollmentList;
