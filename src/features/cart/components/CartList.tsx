"use client";

import { useModalStore } from "@/stores/useModalStore";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";
import { CartCourse } from "../types";
import { ActionState } from "@/shared/types/types";
import { Button } from "@/shared/components/ui";

interface CartListProps {
  cartItems: CartCourse[];
  deleteCartItemAction: (courseId: number) => Promise<ActionState>;
  deleteCartAllAction: () => Promise<ActionState>;
}
export default function CartList({
  cartItems,
  deleteCartItemAction,
  deleteCartAllAction,
}: CartListProps) {
  const { openModal } = useModalStore();
  const handleDeleteAll = () => {
    openModal({
      title: "장바구니 삭제",
      message: "장바구니에 담은 모든 강좌를 삭제하시겠습니까?",
      onConfirm: async () => {
        const result = await deleteCartAllAction();
        if (!result.success) {
          openModal({
            title: "삭제 실패",
            message: result.message || "전체 삭제에 실패했습니다.",
          });
        }
      },
      showCancel: true,
    });
  };
  return (
    <section className={styles.list}>
      <div className={styles.header}>
        <h1 className={styles.title}>총 {cartItems.length}개의 강좌</h1>
        <Button
          variant="ghost"
          size="sm"
          className={styles.clearButton}
          onClick={handleDeleteAll}
        >
          전체 삭제
        </Button>
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
