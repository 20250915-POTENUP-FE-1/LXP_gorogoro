import { useEffect, useState } from "react";
import MySidebar from "../../components/student/MySidebar";
import "./MyPage.css";

import { Outlet } from "react-router-dom";
import { getEnrollmentsById } from "../../services/cartService";
import { getCourseById } from "../../services/courseService";

const USER_ID = "gNpMmunioN2JyXVqag3q";
function MyPage() {
  const [enrolls, setEnrolls] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getEnrollmentsById(USER_ID);
      setEnrolls(result);
    };
    fetchData();
  }, []);
  console.log(enrolls);
  useEffect(() => {
    if (!enrolls.length) return;
    try {
      const fetchData = async () => {
        // map()배열반환: 각 id에 대한 비동기 요청들을 배열로 만들고
        const tasks = enrolls.map((enroll) => getCourseById(enroll.courseId));
        // Promise.all로 병렬 처리 → 모든 상세가 완료되면 결과 배열을 받음
        const result = await Promise.all(tasks);
        setCourses(result ?? []);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [enrolls]);

  const outletContext = { enrolls, courses };
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
