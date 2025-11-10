import "./CourseItem.css";

function CourseItem({ course }) {
  return (
    <>
      <article className="course-item" key={course.title}>
        <div className="course-item__image-wrapper">
          <img
            className="course-item__image"
            src={course.imageSrc}
            alt={course.imageAlt}
          />
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
