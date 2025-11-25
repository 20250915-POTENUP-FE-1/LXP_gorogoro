import { useEffect, useState } from "react";
import MySidebar from "../../components/student/MySidebar";
import "./MyPage.css";

import { Outlet } from "react-router-dom";
import {
  getEnrollmentsById,
  deleteEnrollmentsById,
} from "../../services/cartService";
import { getCourseById } from "../../services/courseService";
import { useSelector } from "react-redux";

function MyPage() {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const USER_ID = userProfile?.id;
  const [enrolls, setEnrolls] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEnrollmentsById(USER_ID);
        setEnrolls(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (USER_ID) {
      fetchData();
    }
  }, [USER_ID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // map()배열반환: 각 id에 대한 비동기 요청들을 배열로 만들고
        const tasks = enrolls.map((enroll) => getCourseById(enroll.courseId));
        // Promise.all로 병렬 처리 → 모든 상세가 완료되면 결과 배열을 받음
        const result = await Promise.all(tasks);
        setCourses(result ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    if (enrolls.length > 0) {
      fetchData();
    }
  }, [enrolls]);

  if (!userProfile) {
    return null;
  }

  const handleCancel = async (courseId) => {
    if (window.confirm("정말로 수강을 취소하시겠습니까?")) {
      try {
        await deleteEnrollmentsById(USER_ID, courseId); //파라미터 (2개필요):currenUser, courseId
        setEnrolls((prev) =>
          prev.filter((prevItem) => prevItem.courseId !== courseId)
        );
      } catch (error) {
        console.log("수강 취소 중 오류가 발생했습니다.", error);
        alert("수강 취소에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
  const outletContext = { enrolls, courses, handleCancel };
  return (
    <main className="my-page">
      <div className="page-wrapper my-page__container">
        <MySidebar />
        <Outlet context={outletContext} />
      </div>
    </main>
  );
}

export default MyPage;
