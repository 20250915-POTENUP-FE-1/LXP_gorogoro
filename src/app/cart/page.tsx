import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import styles from "./page.module.css";
import { getCourses } from "@/services/course.service";

const courses: any = [];
const totalCount: any = "2";
const totalPrice: any = "20000";

export default async function CartPage() {
  const courses = await getCourses();

  return (
    <main className={styles.page}>
      <div className={`page-wrapper ${styles.container}`}>
        <CartList courses={courses} totalCount={totalCount} />
        <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
      </div>
    </main>
  );
}
