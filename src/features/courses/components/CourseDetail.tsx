// 장바구니 담기 버튼
"use client";

import "./CourseDetail.css";

export default function CourseDetail({ course }: any) {
  const handleAddToCart = async (courseId: string) => {
    try {
      // await addCartItem(USER_ID, courseId);
      alert("장바구니에 잘 담겼습니다.");
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
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
                <dd className="course-detail__meta-value">{course.level}</dd>
              </div>
              <div className="course-detail__meta-row">
                <dt className="course-detail__meta-label">카테고리</dt>
                <dd className="course-detail__meta-value">{course.category}</dd>
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
                src="/assets/shopping-cart.svg"
                alt=""
                aria-hidden="true"
              />
              장바구니 담기
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
