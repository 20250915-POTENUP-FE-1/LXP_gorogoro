"use client";
import styles from "./InstructorCourseItem.module.css";
import { deleteCourseAction } from "../action";
import { useRouter } from "next/navigation";

export default function InstructorCourseItem({ course }: any) {
  const router = useRouter();
  const courseId = course.id;
  const handleClickEdit = () => {
    router.push(`/instructor/courses/${courseId}/edit`);
  };
  const handleClickDelete = async () => {
    if (confirm("삭제 하시겠습니까?")) {
      await deleteCourseAction(courseId);
    }
  };
  return (
    <article
      className={`${styles.item} ${
        course.status === "archived" ? styles.archived : ""
      }`}
    >
      <div className={styles.thumbnail}>
        <img
          className={styles.image}
          src={course.thumbnailUrl}
          alt={course.title}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{course.category}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructor}</p>
      </div>
      <div className={styles.meta}>
        <span className={styles.price}>{course.price}</span>
        {/* <span className={styles.date}>
            {course.createdAt.toDate().toLocaleDateString()}
          </span> */}
        <div className={styles.actions}>
          <button
            className={`${styles.action} ${styles.actionEdit}`}
            type="button"
            onClick={handleClickEdit}
          >
            수정하기
          </button>
          <button
            className={`${styles.action} ${styles.actionDelete}`}
            type="button"
            onClick={handleClickDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </article>
  );
}
