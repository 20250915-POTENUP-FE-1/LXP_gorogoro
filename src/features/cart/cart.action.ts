'use server';

import { deleteAllCart, deleteCartItem } from '@/services/cart.service';
import { BackendError } from '@/shared/types/types';
import { handleBackendError } from '@/shared/utils/errorHandler';
import { revalidatePath } from 'next/cache';
import { addMyEnrollments } from '@/services/course.service';

export const deleteCartItemAction = async (courseId: number): Promise<ActionState<null>> => {
  try {
    await deleteCartItem({ courseId });
    revalidatePath('/cart');
    return {
      success: true,
      message: '장바구니에서 삭제되었습니다.',
    };
  } catch (error) {
    const err = error as BackendError;
    return handleBackendError(err);
  }
};

export const deleteCartAllAction = async () => {
  try {
    await deleteAllCart();
    revalidatePath('/cart');
    return {
      success: true,
      message: '장바구니에서 모두 삭제되었습니다.',
    };
  } catch (error) {
    const err = error as BackendError;
    return handleBackendError(err);
  }
};

export const addEnrollAction = async (courseId: number): Promise<ActionState<null>> => {
  console.log('수강신청 시작 - course ID:', courseId);
  try {
    await addMyEnrollments({ courseId });
    // revalidatePath('/cart');
    return {
      success: true,
      message: '수강 신청이 완료되었습니다.',
    };
  } catch (error: any) {
    console.error('서버 액션 내부 에러 발생:', error.message || error);
    const err = error as BackendError;
    return handleBackendError(err);
  }
};
