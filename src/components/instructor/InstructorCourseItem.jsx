import "./InstructorCourseItem.css";

import { useNavigate } from "react-router-dom";
import { deleteCourseSafely } from "../../services/courseService";

function InstructorCourseItem({ course, setCourses }) {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/instructor/courses/${course.id}/edit`);
  };

  /**
   * 1. 수강 신청(enrollments) 또는 장바구니(carts)에 강좌가 있는지 확인합니다.
   * 2. 하나라도 존재하면 'soft-delete' (status: 'archived'로 변경).
   * 3. 모두 존재하지 않으면 'hard-delete' (문서 삭제).
   */
  const handleClickDelete = async () => {
    if (window.confirm(`'${course.title}' 강좌를 정말로 삭제하시겠습니까?`)) {
      const resultMsg = await deleteCourseSafely(course.id);
      alert(resultMsg);

      // InstructorPage에서의 courses 상태 관리 업데이트
      setCourses((prevCourses) =>
        prevCourses.filter((c) => c.id !== course.id)
      );
    }
  };

  return (
    <>
      <article className="instructor-course-item">
        <div className="instructor-course-item__thumbnail">
          <img
            className="instructor-course-item__image"
            src={course.thumbnailUrl}
            alt={course.title}
          />
        </div>
        <div className="instructor-course-item__body">
          <span className="instructor-course-item__category">
            {course.category}
          </span>
          <h3 className="instructor-course-item__title">{course.title}</h3>
          <p className="instructor-course-item__instructor">
            {course.instructor}
          </p>
        </div>
        <div className="instructor-course-item__meta">
          <span className="instructor-course-item__price">{course.price}</span>
          {/* <span className="instructor-course-item__date">
            {course.createdAt.toDate().toLocaleDateString()}
          </span> */}
          <div className="instructor-course-item__actions">
            <button
              className="instructor-course-item__action instructor-course-item__action--edit"
              type="button"
              onClick={handleClickEdit}
            >
              수정하기
            </button>
            <button
              className="instructor-course-item__action instructor-course-item__action--delete"
              type="button"
              onClick={handleClickDelete}
            >
              삭제하기
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default InstructorCourseItem;
