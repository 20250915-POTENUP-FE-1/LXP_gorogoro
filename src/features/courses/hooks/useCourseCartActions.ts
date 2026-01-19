import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore';
import { addToCart } from '@/services/cart.service';
import { useState } from 'react';

type UseCourseCartActionsReturn = {
  pending: boolean;
  add: () => Promise<void>;
  checkout: () => Promise<void>;
};
export default function useCourseCartActions(courseId: number): UseCourseCartActionsReturn {
  const router = useRouter();
  const { openModal } = useModalStore();
  const [pending, setPending] = useState(false);

  const handleCartError = (error: unknown) => {
    if (error instanceof Error && error.message.includes('409')) {
      openModal({
        title: '장바구니',
        message: '이미 장바구니에 담겨있습니다.',
      });
    }
    const msg = error instanceof Error ? error.message : '';
    openModal({
      title: '장바구니',
      message: `${msg}\n장바구니 추가에 실패했습니다. 다시 시도해주세요`,
    });
  };

  const add = async () => {
    if (pending) return;
    setPending(true);

    try {
      await addToCart({ courseId });
      openModal({
        title: '장바구니',
        message: '장바구니에 잘 담겼습니다.',
      });
    } catch (error: unknown) {
      handleCartError(error);
    }
  };

  const checkout = async () => {
    if (pending) return;
    setPending(true);

    try {
      await addToCart({ courseId });
      router.push('/mypage/enrollment');
    } catch (error: unknown) {
      router.push('/cart');
      handleCartError(error);
    }
  };

  return { pending, add, checkout };
}
