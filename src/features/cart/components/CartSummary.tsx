import styles from "./CartSummary.module.css";

export default function CartSummary({
  totalCount,
  totalPrice,
  handlePurchase,
}: any) {
  return (
    <aside className={styles.summary} aria-label="주문 요약">
      <h2 className={styles.title}>주문 요약</h2>
      <dl className={styles.meta}>
        <div className={styles.row}>
          <dt className={styles.label}>강의 총 갯수</dt>
          <dd className={styles.value}>{totalCount}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>가격</dt>
          <dd className={`${styles.value} ${styles.valuePrice}`}>
            ₩{totalPrice.toLocaleString()}
          </dd>
        </div>
      </dl>
      <div className={styles.total}>
        <span className={styles.totalLabel}>총 결제금액</span>
        <span className={styles.totalValue}>
          ₩{totalPrice.toLocaleString()}
        </span>
      </div>
      <button className={styles.button} type="button" onClick={handlePurchase}>
        결제하기
      </button>
      <button className={styles.button} type="button" onClick={handlePurchase}>
        장바구니로 이동
      </button>
    </aside>
  );
}
