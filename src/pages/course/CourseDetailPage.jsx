import CourseDetail from "../../components/course/CourseDetail";
import "./CourseDetailPage.css";

function CourseDetailPage() {
  return (
    <main className="course-detail-page">
      <div className="page-wrapper course-detail-page__container">
        <CourseDetail />
      </div>
    </main>
  );
}

export default CourseDetailPage;
