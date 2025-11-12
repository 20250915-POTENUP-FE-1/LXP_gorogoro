import "./InstructorCourseItem.css";

function InstructorCourseItem({ course }) {
  return (
    <>
      <article className="instructor-course-item">
        <div className="instructor-course-item__thumbnail">
          <img
            className="instructor-course-item__image"
            src={course.thumbnailUrl}
            alt={course.title}
          />
        </div>
        <div className="instructor-course-item__body">
          <span className="instructor-course-item__category">
            {course.category}
          </span>
          <h3 className="instructor-course-item__title">{course.title}</h3>
          <p className="instructor-course-item__instructor">
            {course.instructor}
          </p>
        </div>
        <div className="instructor-course-item__meta">
          <span className="instructor-course-item__price">{course.price}</span>
          <span className="instructor-course-item__date">
            {course.createdAt}
          </span>
          <div className="instructor-course-item__actions">
            <button
              className="instructor-course-item__action instructor-course-item__action--edit"
              type="button"
            >
              수정하기
            </button>
            <button
              className="instructor-course-item__action instructor-course-item__action--delete"
              type="button"
            >
              삭제하기
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default InstructorCourseItem;
