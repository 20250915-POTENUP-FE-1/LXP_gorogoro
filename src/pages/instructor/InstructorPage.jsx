import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import "./InstructorPage.css";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getIntstructorCourses } from "../../services/instructorService";
import { getCategories } from "../../services/courseService";

function InstructorPage() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 카테고리 초기 렌더링
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();

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

  const outletContext = { categories, courses, setCourses, loading, error };

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
