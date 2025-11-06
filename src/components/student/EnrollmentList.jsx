import EnrollmentItem from "./EnrollmentItem";
import "./EnrollmentList.css";

function EnrollmentList() {
  return (
    <section className="enrollment-list" aria-label="수강 중인 강좌">
      <header className="enrollment-list__header">
        <h1 className="enrollment-list__title">내가 수강 중인 강좌</h1>
        <span className="enrollment-list__count">총 4개의 강좌</span>
      </header>
      <div className="enrollment-list__items">
        <EnrollmentItem />
      </div>
    </section>
  );
}

export default EnrollmentList;
