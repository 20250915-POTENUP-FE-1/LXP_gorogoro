// 장바구니 담기 버튼
"use client";

import { useState } from "react";
import styles from "./CourseDetail.module.css";
import CourseCurriculum from "./CourseCurriculum";

export default function CourseDetail({ categoryName, course }: any) {
  const [activeTab, setActiveTab] = useState<
    "description" | "curriculum" | "review" | "request"
  >("description");

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
    <>
      <section className={styles.detail}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.summary}>{course.summary}</p>
            <div className={styles.metaInfo}>
              <div className={styles.instructorInfo}>
                <span className={styles.instructorName}>
                  {course.instructorName}
                </span>
              </div>
              <div className={styles.statsInfo}>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>⭐</span>
                  <span className={styles.statValue}>{course.rating}</span>
                  <span className={styles.statLabel}>({course.reviewCount.toLocaleString()})</span>
                </div>
                <span className={styles.statDivider}>|</span>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statValue}>{course.studentCount.toLocaleString()}</span>
                  <span className={styles.statLabel}>수강생</span>
                </div>
                <span className={styles.statDivider}>|</span>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>❤️</span>
                  <span className={styles.statValue}>{course.likeCount.toLocaleString()}</span>
                  <span className={styles.statLabel}>좋아요</span>
                </div>
              </div>
            </div>

            <section className={styles.section}>
              <div className={styles.tabContainer}>
                <button
                  type="button"
                  className={`${styles.tabButton} ${
                    activeTab === "description" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  상세 정보
                </button>
                <button
                  type="button"
                  className={`${styles.tabButton} ${
                    activeTab === "curriculum" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("curriculum")}
                >
                  커리큘럼
                </button>
                <button
                  type="button"
                  className={`${styles.tabButton} ${
                    activeTab === "review" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("review")}
                >
                  리뷰
                </button>
                <button
                  type="button"
                  className={`${styles.tabButton} ${
                    activeTab === "request" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("request")}
                >
                  문의
                </button>
              </div>

              {activeTab === "description" && (
                <>
                  <h2 className={styles.sectionTitle}>{course.title}</h2>
                  <p className={styles.paragraph}>{course.description}</p>
                </>
              )}

              {activeTab === "curriculum" && (
                <CourseCurriculum
                  contents={course.contents || []}
                  mode="view"
                />
              )}

              {activeTab === "review" && (
                <div className={styles.placeholder}>
                  <p>리뷰 기능은 준비 중입니다.</p>
                </div>
              )}

              {activeTab === "request" && (
                <div className={styles.placeholder}>
                  <p>문의 기능은 준비 중입니다.</p>
                </div>
              )}
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
    </>
  );
}
