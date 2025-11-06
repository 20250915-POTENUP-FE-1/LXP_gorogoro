import MySidebar from "../../components/student/MySidebar";
import EnrollmentList from "../../components/student/EnrollmentList";
import "./MyPage.css";

function MyPage() {
  return (
    <main className="my-page">
      <div className="page-wrapper my-page__container">
        <MySidebar />
        <EnrollmentList />
      </div>
    </main>
  );
}

export default MyPage;
