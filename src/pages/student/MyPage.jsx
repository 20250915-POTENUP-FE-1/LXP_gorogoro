import MySidebar from "../../components/student/MySidebar";
import "./MyPage.css";

import { Outlet } from "react-router-dom";

function MyPage() {
  return (
    <main className="my-page">
      <div className="page-wrapper my-page__container">
        <MySidebar />
        <Outlet />
      </div>
    </main>
  );
}

export default MyPage;
