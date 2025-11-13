import CategoryBar from "../../components/common/CategoryBar";
import CourseList from "../../components/course/CourseList";
import "./CoursePage.css";

import {
  getCategories,
  getFilteredCourses,
} from "../../services/courseService";
import { useEffect, useState } from "react";

function CoursePage() {
  const [categories, setCategories] = useState([{ id: "all", name: "전체" }]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    searchTerm: "",
    sort: "latest",
  });

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  };

  useEffect(() => {
    // 카테고리 초기 렌더링
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories([{ id: "all", name: "전체" }, ...result]);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFilteredCourses = async () => {
      const result = await getFilteredCourses(filters);
      setCourses(result);
    };
    fetchFilteredCourses();
  }, [filters]);

  const currentCategoryName = categories.find(
    (c) => c.id === filters.category
  )?.name;

  const pageTitle = filters.searchTerm
    ? `"${filters.searchTerm}" 검색 결과`
    : `${currentCategoryName} 강좌`;

  return (
    <>
      {courses && (
        <main className="course-page">
          <div className="page-wrapper course-page__container">
            <section className="course-page__intro">
              <h1 className="course-page__title">{pageTitle}</h1>
              <span className="course-page__subtitle">
                총 {courses.length}개의 강좌
              </span>
            </section>
            <CategoryBar
              categories={categories}
              onFilterChange={handleFilterChange}
            />
            <CourseList courses={courses} />
          </div>
        </main>
      )}
    </>
  );
}

export default CoursePage;
