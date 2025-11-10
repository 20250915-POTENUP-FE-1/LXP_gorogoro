import { useEffect, useState } from "react";
import CartList from "../../components/cart/CartList";
import "./CartPage.css";
import { getCarts } from "../../services/cartService";

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
            <aside className="cart-page__summary" aria-label="주문 요약">
              <h2 className="cart-page__summary-title">주문 요약</h2>
              <dl className="cart-page__summary-meta">
                <div className="cart-page__summary-row">
                  <dt className="cart-page__summary-label">강의 총 갯수</dt>
                  <dd className="cart-page__summary-value">4</dd>
                </div>
                <div className="cart-page__summary-row">
                  <dt className="cart-page__summary-label">가격</dt>
                  <dd className="cart-page__summary-value cart-page__summary-value--price">
                    ₩353,000
                  </dd>
                </div>
              </dl>
              <div className="cart-page__summary-total">
                <span className="cart-page__summary-total-label">
                  총 결제금액
                </span>
                <span className="cart-page__summary-total-value">₩353,000</span>
              </div>
              <button className="cart-page__summary-button" type="button">
                수강 신청하기 (결제하기)
              </button>
            </aside>
          </div>
        </main>
      )}
    </>
  );
}

export default CartPage;
