"use client";

import styles from "./EnrollmentItem.module.css";

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
    <article className={styles.item} key={course.title}>
      <div className={styles.thumbnail}>
        <img
          className={styles.image}
          src={course.thumbnailUrl}
          alt={course.title}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.category}>{course.category}</div>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructorName}</p>
      </div>
      <div className={styles.meta}>
        {/* <time
            className={styles.date}
            dateTime={item.enrolledAt.replace(/\./g, "-")}
          >
            {item.enrolledAt}
          </time> */}
        <span className={styles.price}>{course.price}</span>
        <button
          className={styles.action}
          type="button"
          onClick={() => handleCancel(course.id)}
        >
          수강 취소하기
        </button>
      </div>
    </article>
  );
}
