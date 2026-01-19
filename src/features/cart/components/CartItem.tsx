'use client';

import { useModalStore } from '@/stores/useModalStore';
import styles from './CartItem.module.css';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/Button';
import { useResolveCoverSrc } from '@/shared/utils/resolveCoverSrc';
import { Cart } from '@/features/cart/types';
import { useRouter } from 'next/navigation';

interface CartItemProps {
  cart: Cart;
  deleteCartItemAction: (courseId: number) => Promise<ActionState<null>>;
  addEnrollAction: (courseId: number) => Promise<ActionState<null>>;
}
export default function CartItem({ cart, deleteCartItemAction, addEnrollAction }: CartItemProps) {
  const { openModal } = useModalStore();
  const router = useRouter();
  const handleDeleteItem = () => {
    openModal({
      title: '장바구니 삭제',
      message: '선택한 강좌를 삭제하시겠습니까?',
      onConfirm: async () => {
        const result = await deleteCartItemAction(cart.courseId);
        if (!result.success) {
          openModal({
            title: '삭제 실패',
            message: result.message || '삭제에 실패했습니다.',
          });
        }
      },
      showCancel: true,
    });
  };
  const handleEnrollItem = () => {
    openModal({
      title: '수강 신청',
      message: '수강 신청을 하시겠습니까?',
      onConfirm: async () => {
        const result = await addEnrollAction(cart.courseId);
        if (result.success) {
          openModal({
            title: '수강 신청 성공',
            message: result.message || '수강 신청을 완료하였습니다.',
          });
          router.push(`/mypage/enrollment`);
          // router.push(`/courses/${cart.courseId}/learn`);
        } else {
          openModal({
            title: '수강 신청 실패',
            message: result.message || '수강 신청에 실패했습니다.',
          });
        }
      },
      showCancel: true,
    });
  };
  return (
    <article className={styles.item}>
      <div className={styles.thumbnail}>
        <Image
          width={300}
          height={200}
          className={styles.image}
          src={useResolveCoverSrc(cart.coverImgUrl)}
          alt={cart.courseTitle}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>
          {cart.categoryDetail.name}&nbsp;&gt;&nbsp;
          {cart.categoryDetail.subCategoryDetail.name}
        </span>
        <h3 className={styles.title}>{cart.courseTitle}</h3>
        <p className={styles.instructor}>{cart.instructorName}</p>
      </div>
      <div className={styles.summary}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="primary" size="sm" onClick={handleEnrollItem}>
            수강신청
          </Button>
          <Button variant="delete" size="sm" onClick={handleDeleteItem}>
            삭제
          </Button>
        </div>
        <p className={styles.price}>{`₩${cart.price.toLocaleString()}`}</p>
      </div>
    </article>
  );
}
