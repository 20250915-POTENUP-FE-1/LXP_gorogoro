import CategoryBar from "../../components/common/CategoryBar";
import CourseList from "../../components/course/CourseList";
import "./CoursePage.css";

function CoursePage() {
  return (
    <main className="course-page">
      <div className="page-wrapper course-page__container">
        <section className="course-page__intro">
          <h1 className="course-page__title">데이터 분석, 파이썬</h1>
          <span className="course-page__subtitle">총 128개의 강좌</span>
        </section>
        <CategoryBar />
        <CourseList />
      </div>
    </main>
  );
}

export default CoursePage;
