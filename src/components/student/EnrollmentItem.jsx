import "./EnrollmentItem.css";

function EnrollmentItem({ course }) {
  return (
    <>
      <article className="enrollment-item" key={course.title}>
        <div className="enrollment-item__thumbnail">
          <img
            className="enrollment-item__image"
            src={course.thumbnailUrl}
            alt={course.title}
          />
        </div>
        <div className="enrollment-item__body">
          <div className="enrollment-item__category">{course.category}</div>
          <h3 className="enrollment-item__title">{course.title}</h3>
          <p className="enrollment-item__instructor">{course.instructorName}</p>
        </div>
        <div className="enrollment-item__meta">
          {/* <time
            className="enrollment-item__date"
            dateTime={item.enrolledAt.replace(/\./g, "-")}
          >
            {item.enrolledAt}
          </time> */}
          <span className="enrollment-item__price">{course.price}</span>
          <button className="enrollment-item__action" type="button">
            수강 취소하기
          </button>
        </div>
      </article>
    </>
  );
}

export default EnrollmentItem;
