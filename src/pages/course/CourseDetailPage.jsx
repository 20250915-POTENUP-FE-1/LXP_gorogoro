import CourseDetail from "../../components/course/CourseDetail";
import "./CourseDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../services/courseService.js";

function CourseDetailPage() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await getCourseById(id);
        setCourse(course);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);
  return (
    <main className="course-detail-page">
      <div className="page-wrapper course-detail-page__container">
        <CourseDetail course={course} />
      </div>
    </main>
  );
}

export default CourseDetailPage;
