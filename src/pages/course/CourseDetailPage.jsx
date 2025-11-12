import CourseDetail from "../../components/course/CourseDetail";
import "./CourseDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../services/courseService.js";
import { addCartItem } from "../../services/cartService.js";

const USER_ID = "bbbbbbbbbqag3b";
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
  console.log(id);

  const handleAddToCart = async (courseId) => {
    try {
      await addCartItem(USER_ID, courseId);
      alert("장바구니에 잘 담겼습니다.");
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <main className="course-detail-page">
      <div className="page-wrapper course-detail-page__container">
        <CourseDetail course={course} handleAddToCart={handleAddToCart} />
      </div>
    </main>
  );
}

export default CourseDetailPage;
