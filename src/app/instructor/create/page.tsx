import CourseForm from "@/features/intructor/components/CourseForm";
import "./CourseCreatePage.css";

export default function CourseCreatePage() {
  return (
    <section className="course-create-container">
      <header className="course-create-container__header">
        <h1 className="course-create-container__title">내 강좌 생성하기</h1>
        <p className="course-create-container__subtitle">
          새 강좌를 만들고 지식을 공유해주세요!
        </p>
      </header>
      <CourseForm />
    </section>
  );
}
