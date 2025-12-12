"use client";

import { useModalStore } from "@/stores/useModalStore";
import styles from "./CartItem.module.css";

type CartCourse = {
  courseId: string | number;
  coverImgUrl: string;
  categoryName: string;
  subCategoryName: string;
  courseTitle: string;
  instructorName: string;
  price: number;
};
interface CartItemProps {
  course: CartCourse;
  deleteCartItemAction: (courseId: string | number) => Promise<void>;
}
export default function CartItem({
  course,
  deleteCartItemAction,
}: CartItemProps) {
  const { openModal } = useModal();
  const handleDeleteItem = async () => {
    try {
      openModal({
        title: "장바구니 삭제",
        message: "선택한 강좌를 삭제하시겠습니까?",
        onConfirm: async () => {
          try {
            await deleteCartItemAction(course.courseId);
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
