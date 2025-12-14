"use client";

import { useModalStore } from "@/stores/useModalStore";
import styles from "./CartItem.module.css";
import { CartCourse } from "../types";

type ActionState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};
interface CartItemProps {
  course: CartCourse;
  deleteCartItemAction: (courseId: number) => Promise<ActionState>;
}
export default function CartItem({
  course,
  deleteCartItemAction,
}: CartItemProps) {
  const { openModal } = useModalStore();
  const handleDeleteItem = () => {
    openModal({
      title: "장바구니 삭제",
      message: "선택한 강좌를 삭제하시겠습니까?",
      onConfirm: async () => {
        const result = await deleteCartItemAction(course.courseId);
        if (!result.success) {
          openModal({
            title: "삭제 실패",
            message: result.message || "삭제에 실패했습니다.",
          });
        }
      },
      showCancel: true,
    });
  };
  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        <img
          className={styles.image}
          src={course.coverImgUrl}
          alt={course.courseTitle}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>
          {course.categoryName}&nbsp;&gt;&nbsp;
          {course.subCategoryName}
        </span>
        <h3 className={styles.title}>{course.courseTitle}</h3>
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
        <p className={styles.price}>{`₩${course.price.toLocaleString()}`}</p>
      </div>
    </article>
  );
}
