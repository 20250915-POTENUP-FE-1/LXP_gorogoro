import CartItem from "./CartItem";
import styles from "./CartList.module.css";

export default function CartList({ courses, totalCount }: any) {
  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <h1 className={styles.title}>총 {totalCount}개의 강좌</h1>
        <button className={styles.clearButton} type="button">
          전체 삭제
        </button>
      </div>
      <div className={styles.items}>
        {courses.map((course: any) => (
          <CartItem key={course.id ?? course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
