"use client";

import { useModalStore } from "@/stores/useModalStore";
import styles from "./CartItem.module.css";

export default function CartItem({ course, deleteCartItemAction }: any) {
  const { openModal } = useModalStore();
  const handleDeleteItem = async () => {
    try {
      openModal({
        title: "장바구니 삭제",
        message: "선택한 강좌를 삭제하시겠습니까?",
        onConfirm: async () => {
          try {
            await deleteCartItemAction(course.id);
          } catch (error) {
            console.log(error);
          }
        },
        showCancel: true,
        onCancel: () => {},
      });
    } catch (error) {
      console.log(error);
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
