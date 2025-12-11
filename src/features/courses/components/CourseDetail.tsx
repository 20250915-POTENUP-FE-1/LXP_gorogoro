"use client";

import styles from "./CourseDetail.module.css";
import { Category } from "../types";
import { addToCart } from "@/services/cart.service";
import { useRouter } from "next/navigation";
import { useModal } from "@/shared/components/ui/ModalContext";

export default function CourseDetail({ categories, course }: any) {
  const category = categories.find((c: Category) => c.id === course.categoryId);
  const categoryName = category?.name;
  const router = useRouter();
  const { openModal } = useModal();
  const handleCartError = (error: unknown, pageRoute?: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes("409"))
        openModal({
          title: "장바구니",
          message: "이미 장바구니에 담겨있습니다.",
        });
      pageRoute;
    } else {
      openModal({
        title: "장바구니",
        message: "장바구니 추가에 실패했습니다. 다시 시도해주세요",
      });
    }
  };
  const handleAddToCart = async () => {
    try {
      await addToCart(course.id);
      openModal({
        title: "장바구니",
        message: "장바구니에 잘 담겼습니다.",
      });
    } catch (error: unknown) {
      handleCartError(error);
    }
  };
  const handleCheckoutNow = async () => {
    try {
      await addToCart(course.id);
      router.push("/cart");
    } catch (error: unknown) {
      const pageRoute = router.push("/cart");
      handleCartError(error, pageRoute);
    }
  };
  return (
    <section className={styles.detail}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.summary}>{course.summary}</p>
          <div className={styles.instructor}>
            <div className={styles.instructorInfo}>
              <span className={styles.instructorName}>
                {course.instructorName}
              </span>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{course.title}</h2>
            <p className={styles.paragraph}>{course.content}</p>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <img className={styles.thumbnail} src={course.coverImageUrl}></img>
          <div className={styles.summaryCard}>
            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>난이도</dt>
                <dd className={styles.metaValue}>{course.level}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>카테고리</dt>
                <dd className={styles.metaValue}>{categoryName}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>가격</dt>
                <dd className={styles.metaPrice}>
                  ₩{course.price.toLocaleString()}
                </dd>
              </div>
            </dl>
            <div className={styles.ctaGroup}>
              <button
                className={styles.ctaPrimary}
                type="button"
                onClick={handleAddToCart}
              >
                <img
                  className={styles.ctaIcon}
                  src="/assets/shopping-cart.svg"
                  alt=""
                  aria-hidden="true"
                />
                장바구니 담기
              </button>
              <button
                className={styles.ctaSecondary}
                type="button"
                onClick={handleCheckoutNow}
              >
                바로 결제하기
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
