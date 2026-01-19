'use client';

import { useModalStore } from '@/stores/useModalStore';
import styles from './CartList.module.css';
import { Button } from '@/shared/components/ui/Button';
import { Cart } from '@/features/cart/types';
import CartItem from '@/features/cart/components/CartItem';

interface CartListProps {
  cartItems: Cart[];
  deleteCartItemAction: (courseId: number) => Promise<ActionState<null>>;
  deleteCartAllAction: () => Promise<ActionState<null>>;
  addEnrollAction: (courseId: number) => Promise<ActionState<null>>;
}
export default function CartList({
  cartItems,
  deleteCartItemAction,
  deleteCartAllAction,
  addEnrollAction,
}: CartListProps) {
  const { openModal } = useModalStore();
  const handleDeleteAll = () => {
    openModal({
      title: '장바구니 삭제',
      message: '장바구니에 담은 모든 강좌를 삭제하시겠습니까?',
      onConfirm: async () => {
        const result = await deleteCartAllAction();
        if (!result.success) {
          openModal({
            title: '삭제 실패',
            message: result.message || '전체 삭제에 실패했습니다.',
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
        <Button variant="cancel" onClick={handleDeleteAll}>
          전체 삭제
        </Button>
      </div>
      <div className={styles.items}>
        {cartItems.map((cart) => (
          <CartItem
            key={cart.courseId}
            cart={cart}
            deleteCartItemAction={deleteCartItemAction}
            addEnrollAction={addEnrollAction}
          />
        ))}
      </div>
    </section>
  );
}
