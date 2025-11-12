import "./CourseDetail.css";

function CourseDetail({ course, handleAddToCart }) {
  return (
    <>
      {course && (
        <section className="course-detail">
          <div className="course-detail__layout">
            <div className="course-detail__main">
              <h1 className="course-detail__title">{course.title}</h1>
              <p className="course-detail__summary">{course.summary}</p>
              <div className="course-detail__instructor">
                <div className="course-detail__instructor-info">
                  <span className="course-detail__instructor-name">
                    {course.instructorName}
                  </span>
                </div>
              </div>

              <section className="course-detail__section">
                <h2 className="course-detail__section-title">{course.title}</h2>
                <p className="course-detail__paragraph">{course.content}</p>
              </section>
            </div>

            <aside className="course-detail__sidebar">
              <img
                className="course-detail__thumbnail"
                src={course.thumbnailUrl}
              ></img>
              <div className="course-detail__summary-card">
                <dl className="course-detail__meta">
                  <div className="course-detail__meta-row">
                    <dt className="course-detail__meta-label">난이도</dt>
                    <dd className="course-detail__meta-value">
                      {course.level}
                    </dd>
                  </div>
                  <div className="course-detail__meta-row">
                    <dt className="course-detail__meta-label">카테고리</dt>
                    <dd className="course-detail__meta-value">
                      {course.category}
                    </dd>
                  </div>
                  <div className="course-detail__meta-row">
                    <dt className="course-detail__meta-label">가격</dt>
                    <dd className="course-detail__meta-price">
                      ₩{course.price.toLocaleString()}
                    </dd>
                  </div>
                </dl>
                <button
                  className="course-detail__cta"
                  type="button"
                  onClick={() => handleAddToCart(course.id)}
                >
                  <img
                    className="course-detail__cta-icon"
                    src="/assets/icons/shopping-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  장바구니 담기
                </button>
              </div>
            </aside>
          </div>
        </section>
      )}
    </>
  );
}

export default CourseDetail;
