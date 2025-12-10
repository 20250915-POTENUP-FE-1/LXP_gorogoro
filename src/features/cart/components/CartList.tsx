"use client";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

export default function CartList({
  courses,
  totalCount,
  deleteCartItemAction,
  deleteCartAllAction,
}: any) {
  const handleDeleteAll = async () => {
    try {
      await deleteCartAllAction();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <h1 className={styles.title}>총 {totalCount}개의 강좌</h1>
        <button
          className={styles.clearButton}
          type="button"
          onClick={handleDeleteAll}
        >
          전체 삭제
        </button>
      </div>
      <div className={styles.items}>
        {courses.map((course: any) => (
          <CartItem
            key={course.id ?? course.courseId}
            course={course}
            deleteCartItemAction={deleteCartItemAction}
          />
        ))}
      </div>
    </section>
  );
}
