import CartList from '@/features/cart/components/CartList';
import CartSummary from '@/features/cart/components/CartSummary';
import styles from './page.module.css';
import { getCart } from '@/services/cart.service';
import { deleteCartAllAction, deleteCartItemAction } from '@/features/cart/action';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '장바구니',
  description: '담아둔 강의를 확인하고 결제 전 최종 구성을 정리하세요.',
};

export default async function CartPage() {
  const courses = await getCart();
  const { items, summary } = courses;
  const cartItems = items;
  const cartSummary = summary;
  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CartList
          cartItems={cartItems}
          deleteCartItemAction={deleteCartItemAction}
          deleteCartAllAction={deleteCartAllAction}
        />
        <CartSummary cartSummary={cartSummary} />
      </div>
    </main>
  );
}
