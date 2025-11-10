import CategoryBar from "../../components/common/CategoryBar";
import CourseList from "../../components/course/CourseList";
import "./CoursePage.css";

import { getCategories, getCourses } from "../../services/courseService";
import { useEffect, useState } from "react";

function CoursePage() {
  const [categories, setCategories] = useState([{ id: "all", name: "전체" }]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 카테고리 초기 렌더링
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories([{ id: "all", name: "전체" }, ...result]);
    };
    fetchCategories();

    // 강좌 초기 렌더링
    const fetchCourses = async () => {
      const result = await getCourses();
      setCourses(result);
    };
    fetchCourses();
  }, []);

  return (
    <main className="course-page">
      <div className="page-wrapper course-page__container">
        <section className="course-page__intro">
          <h1 className="course-page__title">데이터 분석, 파이썬</h1>
          <span className="course-page__subtitle">
            총 {courses.length}개의 강좌
          </span>
        </section>
        <CategoryBar categories={categories} />
        <CourseList courses={courses} />
      </div>
    </main>
  );
}

export default CoursePage;
