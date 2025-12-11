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
  console.log(courses);
  const { cart_id: cartId, items, summary } = courses;
  const cartItems = items;
  const cartSummary = summary;
  console.log(cartItems);
  console.log(cartSummary);
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
