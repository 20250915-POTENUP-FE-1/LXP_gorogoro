import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import "./InstructorPage.css";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getIntstructorCourses } from "../../services/instructorService";

function InstructorPage() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInstructorCouses = async () => {
      setLoading(true);
      const result = await getIntstructorCourses("UID_INSTRUCTOR_2");

      if (typeof result === "object") {
        setCourses(result);
        setError("");
      } else {
        setCourses(null);
        setError(result || "강좌 정보를 불러오지 못했습니다.");
      }
      setLoading(false);
    };
    fetchInstructorCouses();
  }, []);

  const outletContext = { courses, loading, error };

  return (
    <main className="instructor-page">
      <div className="page-wrapper instructor-page__container">
        <InstructorSidebar />
        <Outlet context={outletContext} />
      </div>
    </main>
  );
}

export default InstructorPage;
