import CourseItem from "./CourseItem";
import "./CourseList.css";

export default function CourseList({ courses }: any) {
  return (
    <section className="course-list" aria-label="강좌 목록">
      <div className="course-list__grid">
        {courses.map((course: any) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
