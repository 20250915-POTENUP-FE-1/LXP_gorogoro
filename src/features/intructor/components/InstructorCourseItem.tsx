"use client";
import styles from "./InstructorCourseItem.module.css";
import { DeleteCourseAction } from "../action";
import { useRouter } from "next/navigation";
import { InstructorCourse } from "../types";

const getLevelLabel = (level: string) => {
  switch (level) {
    case "BEGINNER":
      return "초급";
    case "INTERMEDIATE":
      return "중급";
    case "ADVANCED":
      return "고급";
    default:
      return level;
  }
};

interface InstructorCourseItemProps {
  course: InstructorCourse;
}

export default function InstructorCourseItem({
  course,
}: InstructorCourseItemProps) {
  const router = useRouter();
  const courseId = course.courseId;
  const handleClickEdit = () => {
    router.push(`/instructor/courses/${courseId}/edit`);
  };
  const handleClickDelete = async () => {
    if (confirm("삭제 하시겠습니까?")) {
      await DeleteCourseAction(courseId);
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
          src={course.coverImageUrl}
          alt={course.title}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{course.category}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructor}</p>
        <div className={styles.stats}>
          <span className={styles.levelBadge}>
            {getLevelLabel(course.difficulty)}
          </span>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>평점(4.5)</span>
            {course.rating}
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>리뷰(11)</span>
            {course.reviewCount}
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>수강생(23)</span>
            {course.studentCount}
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>♥️좋아요(78)</span>
            {course.likeCount}
          </div>
        </div>
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
