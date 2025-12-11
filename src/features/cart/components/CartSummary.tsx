import styles from "./CartSummary.module.css";
import Link from "next/link";

export default function CartSummary({ totalCount, totalPrice }: any) {
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
      <Link href="/mypage">
        <button className={styles.button}>결제하기</button>
      </Link>
    </aside>
  );
}
