"use client";
import styles from "./CartItem.module.css";

export default function CartItem({ course, handleDelete }: any) {
  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        <img className={styles.image} src={course.coverImageUrl} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{course.category}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructor}</p>
        {/* toLocaleDateString()을 사용해 Date 객체를 문자열로 변환 */}
        <time dateTime={course.createdAt}>{course.createdAt}</time>
      </div>
      <div className={styles.summary}>
        <button
          className={styles.remove}
          type="button"
          onClick={() => handleDelete(course.id)}
        >
          삭제
        </button>
        <p className={styles.price}>{course.price}</p>
      </div>
    </article>
  );
}
