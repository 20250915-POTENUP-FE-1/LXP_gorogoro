import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import styles from "./page.module.css";
import { getCart } from "@/services/cart.service";
import {
  deleteCartAllAction,
  deleteCartItemAction,
} from "@/features/cart/action";

export default async function CartPage() {
  const courses = await getCart();
  const totalCount = courses.length;
  const totalPrice = courses.reduce(
    (accumulator: number, currentValue: any): number =>
      accumulator + currentValue.price,
    0
  );

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CartList
          courses={courses}
          totalCount={totalCount}
          deleteCartItemAction={deleteCartItemAction}
          deleteCartAllAction={deleteCartAllAction}
        />
        <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
      </div>
    </main>
  );
}
