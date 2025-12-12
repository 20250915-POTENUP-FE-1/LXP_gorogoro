"use client";

import { useModalStore } from "@/stores/useModalStore";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";
import { CartCourse } from "../types";
interface CartListProps {
  cartItems: CartCourse[];
  deleteCartItemAction: (courseId: number) => Promise<void>;
  deleteCartAllAction: () => Promise<void>;
}
export default function CartList({
  cartItems,
  deleteCartItemAction,
  deleteCartAllAction,
}: CartListProps) {
  const { openModal } = useModal();
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
        <h1 className={styles.title}>총 {cartItems.length}개의 강좌</h1>
        <button
          className={styles.clearButton}
          type="button"
          onClick={handleDeleteAll}
        >
          전체 삭제
        </button>
      </div>
      <div className={styles.items}>
        {cartItems.map((course: CartCourse) => (
          <CartItem
            key={course.courseId}
            course={course}
            deleteCartItemAction={deleteCartItemAction}
          />
        ))}
      </div>
    </section>
  );
}
