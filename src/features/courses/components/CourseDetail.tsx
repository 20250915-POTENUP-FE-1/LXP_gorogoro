// 장바구니 담기 버튼
"use client";

import styles from "./CourseDetail.module.css";
import { Category } from "../types";

export default function CourseDetail({ categories, course }: any) {
  const category = categories.find((c: Category) => c.id === course.categoryId);
  const categoryName = category?.name;

  const handleAddToCart = async (courseId: string) => {
    try {
      // await addCartItem(USER_ID, courseId);
      alert("장바구니에 잘 담겼습니다.");
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
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
                  {/* ₩{course.price.toLocaleString()} */}
                </dd>
              </div>
            </dl>
            <div className={styles.ctaGroup}>
              <button
                className={styles.ctaPrimary}
                type="button"
                onClick={() => handleAddToCart(course.id)}
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
                onClick={() => alert("바로 결제하기 기능은 준비중입니다.")}
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
