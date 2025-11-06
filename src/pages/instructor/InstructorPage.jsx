import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import "./InstructorPage.css";

import { Outlet } from "react-router-dom";

function InstructorPage() {
  return (
    <main className="instructor-page">
      <div className="page-wrapper instructor-page__container">
        <InstructorSidebar />
        <Outlet />
      </div>
    </main>
  );
}

export default InstructorPage;
