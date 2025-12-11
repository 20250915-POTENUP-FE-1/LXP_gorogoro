"use client";

import { useModalStore } from "@/stores/useModalStore";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

export default function CartList({
  courses,
  totalCount,
  deleteCartItemAction,
  deleteCartAllAction,
}: any) {
  const { openModal } = useModalStore();
  const handleDeleteAll = async () => {
    try {
      openModal({
        title: "장바구니 삭제",
        message: "장바구니에 담은 모든 강좌를 삭제하시겠습니까?",
        onConfirm: async () => {
          try {
            await deleteCartAllAction();
          } catch (error) {
            console.log(error);
          }
        },
      });
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
