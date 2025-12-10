"use client";
import styles from "./CartItem.module.css";

export default function CartItem({ course, deleteCartItemAction }: any) {
  const handleDeleteItem = async () => {
    try {
      await deleteCartItemAction(course.id);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        <img className={styles.image} src={course.coverImageUrl} />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{course.category}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.instructor}>{course.instructorName}</p>
      </div>
      <div className={styles.summary}>
        <button
          className={styles.remove}
          type="button"
          onClick={handleDeleteItem}
        >
          삭제
        </button>
        <p className={styles.price}>{course.price}</p>
      </div>
    </article>
  );
}
