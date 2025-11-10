import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import "./CartPage.css";

import { getCarts } from "../../services/cartService";
import { useEffect, useState } from "react";

function CartPage() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCarts("LZqtJ2SBhuKgaaSihBZ4");
      setCarts(result);
    };

    fetchData();
  }, []);

  return (
    <>
      {carts && (
        <main className="cart-page">
          <div className="page-wrapper cart-page__container">
            <CartList carts={carts} />
            <CartSummary summary={summary} />
          </div>
        </main>
      )}
    </>
  );
}

export default CartPage;
