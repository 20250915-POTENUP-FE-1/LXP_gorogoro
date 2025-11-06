import CourseCreateForm from "./CourseCreateForm";
import "./CourseCreateContainer.css";

function CourseCreateContainer() {
  return (
    <section className="course-edit-container">
      <header className="course-edit-container__header">
        <h1 className="course-edit-container__title">내 강좌 생성하기</h1>
        <p className="course-edit-container__subtitle">
          새 강좌를 만들고 지식을 공유해주세요!
        </p>
      </header>
      <CourseCreateForm />
    </section>
  );
}

export default CourseCreateContainer;
