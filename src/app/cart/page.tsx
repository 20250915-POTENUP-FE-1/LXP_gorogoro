import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import "./CartPage.css";

const courses: any = [];
const totalCount: any = "";
const totalPrice: any = "";

export default function CartPage() {
  return (
    <main className="cart-page">
      <div className="page-wrapper cart-page__container">
        <CartList courses={courses} totalCount={totalCount} />
        <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
      </div>
    </main>
  );
}
