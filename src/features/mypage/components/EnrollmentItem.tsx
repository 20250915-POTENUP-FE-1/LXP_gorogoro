import "./EnrollmentItem.css";

export default function EnrollmentItem({ course }: any) {
  const handleCancel = async (courseId: string) => {
    // if (window.confirm("정말로 수강을 취소하시겠습니까?")) {
    //   try {
    //     await deleteEnrollmentsById(USER_ID, courseId); //파라미터 (2개필요):currenUser, courseId
    //     setEnrolls((prev) =>
    //       prev.filter((prevItem) => prevItem.courseId !== courseId)
    //     );
    //   } catch (error) {
    //     console.log("수강 취소 중 오류가 발생했습니다.", error);
    //     alert("수강 취소에 실패했습니다. 다시 시도해주세요.");
    //   }
    // }
  };

  return (
    <article className="enrollment-item" key={course.title}>
      <div className="enrollment-item__thumbnail">
        <img
          className="enrollment-item__image"
          src={course.thumbnailUrl}
          alt={course.title}
        />
      </div>
      <div className="enrollment-item__body">
        <div className="enrollment-item__category">{course.category}</div>
        <h3 className="enrollment-item__title">{course.title}</h3>
        <p className="enrollment-item__instructor">{course.instructorName}</p>
      </div>
      <div className="enrollment-item__meta">
        {/* <time
            className="enrollment-item__date"
            dateTime={item.enrolledAt.replace(/\./g, "-")}
          >
            {item.enrolledAt}
          </time> */}
        <span className="enrollment-item__price">{course.price}</span>
        <button
          className="enrollment-item__action"
          type="button"
          onClick={() => handleCancel(course.id)}
        >
          수강 취소하기
        </button>
      </div>
    </article>
  );
}
