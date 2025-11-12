import "./CourseEditContainer.css";
import CourseEditForm from "./CourseEditForm";

import { useParams } from "react-router-dom";

function CourseEditContainer() {
  const { id: courseId } = useParams();

  return (
    <section className="course-edit-container">
      <header className="course-edit-container__header">
        <h1 className="course-edit-container__title">내 강좌 수정하기</h1>
        <p className="course-edit-container__subtitle">
          강좌 정보를 업데이트하고 최신 상태로 유지하세요.
        </p>
      </header>
      <CourseEditForm courseId={courseId} />
    </section>
  );
}

export default CourseEditContainer;
