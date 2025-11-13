import { useNavigate } from "react-router-dom";
import "./CourseItem.css";

function CourseItem({ course }) {
  const navigate = useNavigate();

  return (
    <>
      <article
        onClick={() => navigate(`/courses/${course.id}`)}
        className="course-item"
        key={course.id}
      >
        <div className="course-item__image-wrapper">
          <img className="course-item__image" src={course.thumbnailUrl} />
        </div>
        <div className="course-item__body">
          <p className="course-item__category">{course.category}</p>
          <h3 className="course-item__title">{course.title}</h3>
          <p className="course-item__price">{course.price}</p>
          <p className="course-item__instructor">{course.instructorName}</p>
        </div>
      </article>
    </>
  );
}

export default CourseItem;
