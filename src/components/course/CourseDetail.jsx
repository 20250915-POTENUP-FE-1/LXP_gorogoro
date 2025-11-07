import "./CourseDetail.css";

function CourseDetail() {
  return (
    <section className="course-detail">
      <div className="course-detail__layout">
        <div className="course-detail__main">
          <div className="course-detail__tags">
            <span className="course-detail__tag">Web Development</span>
            <span className="course-detail__tag course-detail__tag--accent">
              JavaScript
            </span>
          </div>
          <h1 className="course-detail__title">
            Complete React Developer in 2024 (w/ Redux, Hooks, GraphQL)
          </h1>
          <p className="course-detail__summary">
            Master React in this comprehensive course. Learn to build powerful,
            fast, user-friendly and reactive web apps.
          </p>
          <div className="course-detail__instructor">
            <img
              className="course-detail__instructor-avatar"
              src="https://via.placeholder.com/56x56.png?text=JD"
            />
            <div className="course-detail__instructor-info">
              <span className="course-detail__instructor-name">
                Christina Ahn
              </span>
              <span className="course-detail__instructor-role">
                Senior Web Developer
              </span>
            </div>
          </div>

          <section className="course-detail__section">
            <h2 className="course-detail__section-title">강좌 상세 설명</h2>
            <p className="course-detail__paragraph">
              Welcome to the ultimate React course! This course is designed to
              take you from a beginner to an advanced React developer.
              We&apos;ll cover all the fundamental concepts, including
              components, props, state, and the component lifecycle.
            </p>
            <p className="course-detail__paragraph">
              As we progress, we&apos;ll dive into more advanced topics like
              React Hooks (useState, useEffect, useContext, and more), state
              management with Redux and the Context API, routing with React
              Router, and fetching data from APIs. You&apos;ll also learn how to
              build beautiful, responsive user interfaces with popular libraries
              like Tailwind CSS.
            </p>
          </section>
        </div>

        <aside className="course-detail__sidebar">
          <div className="course-detail__thumbnail">thumbnailUrl</div>
          <div className="course-detail__summary-card">
            <dl className="course-detail__meta">
              <div className="course-detail__meta-row">
                <dt className="course-detail__meta-label">난이도</dt>
                <dd className="course-detail__meta-value">초급</dd>
              </div>
              <div className="course-detail__meta-row">
                <dt className="course-detail__meta-label">카테고리</dt>
                <dd className="course-detail__meta-value">웹 개발</dd>
              </div>
              <div className="course-detail__meta-row">
                <dt className="course-detail__meta-label">가격</dt>
                <dd className="course-detail__meta-price">₩55,000</dd>
              </div>
            </dl>
            <button className="course-detail__cta" type="button">
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
  );
}

export default CourseDetail;
