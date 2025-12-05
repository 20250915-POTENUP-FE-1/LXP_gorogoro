import categoryAPI from "@/services/categoryAPI";
import courseAPI from "@/services/courseAPI";

import CategoryBar from "@/features/common/components/CategoryBar";
import CourseList from "@/features/courses/components/CourseList";
import "./CoursePage.css";

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const categoryQuery = params.category || "";
  const searchQuery = params.search || "";
  const sortQuery = params.sort || "";

  const apiParams = {
    category: categoryQuery,
    search: searchQuery,
    sort: sortQuery,
    limit: "10",
  };

  const categories = await categoryAPI.getAllCategories();
  const courses = await courseAPI.getCourses(apiParams);

  const pageTitle = searchQuery
    ? `"${searchQuery}" 검색 결과`
    : `${categoryQuery} 강좌`;

  return (
    <main className="course-page">
      <div className="page-wrapper course-page__container">
        <section className="course-page__intro">
          <h1 className="course-page__title">{pageTitle}</h1>
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
