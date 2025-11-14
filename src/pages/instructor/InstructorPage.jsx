import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import "./InstructorPage.css";

import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";

import { getIntstructorCourses } from "../../services/instructorService";
import { getCategories } from "../../services/courseService";
import { useSelector } from "react-redux";

function InstructorPage() {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const USER_ID = userProfile?.id;

  const [categories, setCategories] = useState([]);

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 강좌 목록 갱신을 위한 트리거

  // 강좌 목록을 불러오는 함수
  const fetchInstructorCourses = useCallback(async () => {
    if (!USER_ID) return; // USER_ID가 없으면 실행하지 않음

    setLoading(true);
    setError("");

    try {
      const result = await getIntstructorCourses(USER_ID);
      if (typeof result === "object") {
        setCourses(result);
        setError("");
      } else if (typeof result === "string") {
        setCourses([]); // 오류 발생 시 빈 배열로 설정
        setError(result || "강좌 정보를 불러오지 못했습니다.");
      }
    } catch (err) {
      console.error("강좌 정보를 불러오는 중 오류 발생:", err);
      setCourses([]);
      setError("강좌 정보를 불러오는 중 예상치 못한 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [USER_ID]); // USER_ID가 변경될 때만 함수 재생성

  // 강좌 목록 갱신을 트리거하는 함수
  const triggerRefreshCourses = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // 카테고리 초기 렌더링
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (err) {
        console.error("카테고리 정보를 불러오는 중 오류 발생:", err);
      }
    };
    fetchCategories();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    fetchInstructorCourses();
  }, [fetchInstructorCourses, refreshTrigger]); // fetchInstructorCourses 또는 refreshTrigger가 변경될 때마다 실행

  const outletContext = {
    categories,
    courses,
    setCourses, // setCourses도 context로 전달하여 필요시 직접 업데이트 가능하게 함 (선택 사항)
    loading,
    error,
    userProfile,
    triggerRefreshCourses, // 강좌 목록 갱신 함수 전달
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
