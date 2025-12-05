export default function CartSummary({
  totalCount,
  totalPrice,
  handlePurchase,
}: any) {
  return (
    <aside className="cart-page__summary" aria-label="주문 요약">
      <h2 className="cart-page__summary-title">주문 요약</h2>
      <dl className="cart-page__summary-meta">
        <div className="cart-page__summary-row">
          <dt className="cart-page__summary-label">강의 총 갯수</dt>
          <dd className="cart-page__summary-value">{totalCount}</dd>
        </div>
        <div className="cart-page__summary-row">
          <dt className="cart-page__summary-label">가격</dt>
          <dd className="cart-page__summary-value cart-page__summary-value--price">
            ₩{totalPrice.toLocaleString()}
          </dd>
        </div>
      </dl>
      <div className="cart-page__summary-total">
        <span className="cart-page__summary-total-label">총 결제금액</span>
        <span className="cart-page__summary-total-value">
          ₩{totalPrice.toLocaleString()}
        </span>
      </div>
      <button
        className="cart-page__summary-button"
        type="button"
        onClick={handlePurchase}
      >
        결제하기
      </button>
    </aside>
  );
}
