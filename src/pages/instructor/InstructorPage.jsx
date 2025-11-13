import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import "./InstructorPage.css";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { getIntstructorCourses } from "../../services/instructorService";
import { getCategories } from "../../services/courseService";
import { useSelector } from "react-redux";

function InstructorPage() {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const USER_ID = userProfile.id;

  const [categories, setCategories] = useState([]);

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 카테고리 초기 렌더링
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();

    const fetchInstructorCouses = async () => {
      // 함수 실행 : pending
      setLoading(true);
      setError("");

      const result = await getIntstructorCourses(USER_ID);

      // 함수 성공 시 : fulfilled
      if (typeof result === "object") {
        setCourses(result);
        setError("");
        setLoading(false);
      }
      // 함수 실패 시 : rejected
      else if (typeof result === "string") {
        setLoading(false);
        setError(result || "강좌 정보를 불러오지 못했습니다.");
      }
      // 함수 종료
    };
    fetchInstructorCouses();
  }, []);

  const outletContext = {
    categories,
    courses,
    setCourses,
    loading,
    error,
    userProfile,
  };

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
