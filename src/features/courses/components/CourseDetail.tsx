"use client";
import { useState } from "react";
import styles from "./CourseDetail.module.css";
import { addToCart } from "@/services/cart.service";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";
import CourseCurriculum from "./CourseCurriculum";
import { CourseDetail as CourseDetailType } from "../types";

interface CourseDetailProps {
  categoryName: string;
  course: CourseDetailType;
}

export default function CourseDetail({
  categoryName,
  course,
}: CourseDetailProps) {
  const router = useRouter();
  const { openModal } = useModalStore();
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
  const [activeTab, setActiveTab] = useState<
    "description" | "curriculum" | "review" | "request"
  >("description");
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
                  <span className={styles.statIcon}>:star:</span>
                  <span className={styles.statValue}>{course.rating}</span>
                  <span className={styles.statLabel}>
                    ({course.reviewCount.toLocaleString()})
                  </span>
                </div>
                <span className={styles.statDivider}>|</span>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>👥</span>
                  <span className={styles.statValue}>
                    {course.studentCount.toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>수강생</span>
                </div>
                <span className={styles.statDivider}>|</span>
                <div className={styles.statItem}>
                  <span className={styles.statIcon}>❤️</span>
                  <span className={styles.statValue}>
                    {course.likeCount.toLocaleString()}
                  </span>
                  <span className={styles.statLabel}>좋아요</span>
                </div>
              </div>
            </div>
            <section className={styles.section}>
              <div className={styles.tabContainer}>
                <Button
                  variant={activeTab === "description" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("description")}
                  className={
                    activeTab === "description" ? styles.activeTab : ""
                  }
                >
                  상세 정보
                </Button>
                <Button
                  variant={activeTab === "curriculum" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("curriculum")}
                  className={activeTab === "curriculum" ? styles.activeTab : ""}
                >
                  커리큘럼
                </Button>
                <Button
                  variant={activeTab === "review" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("review")}
                  className={activeTab === "review" ? styles.activeTab : ""}
                >
                  리뷰
                </Button>
                <Button
                  variant={activeTab === "request" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("request")}
                  className={activeTab === "request" ? styles.activeTab : ""}
                >
                  문의
                </Button>
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
                <div className={styles.reviewSection}>
                  <h2 className={styles.sectionTitle}>리뷰</h2>
                  {course.reviews && course.reviews.length > 0 ? (
                    <div className={styles.reviewList}>
                      {course.reviews.map((review) => (
                        <div key={review.id} className={styles.reviewItem}>
                          <div className={styles.reviewHeader}>
                            <span className={styles.reviewAuthor}>
                              {review.userName}
                            </span>
                            <span className={styles.reviewRating}>
                              ⭐ {review.rating}
                            </span>
                            <span className={styles.reviewDate}>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className={styles.reviewContent}>
                            {review.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.placeholder}>
                      <p>아직 리뷰가 없습니다.</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "request" && (
                <div className={styles.qnaSection}>
                  <h2 className={styles.sectionTitle}>문의</h2>
                  {course.qna && course.qna.length > 0 ? (
                    <div className={styles.qnaList}>
                      {course.qna.map((item) => (
                        <div key={item.id} className={styles.qnaItem}>
                          <div className={styles.qnaHeader}>
                            <span className={styles.qnaTitle}>
                              {item.title}
                            </span>
                            <span
                              className={`${styles.qnaStatus} ${
                                item.status === "answered"
                                  ? styles.qnaAnswered
                                  : styles.qnaPending
                              }`}
                            >
                              {item.status === "answered"
                                ? "답변완료"
                                : "대기중"}
                            </span>
                          </div>
                          <div className={styles.qnaBody}>
                            <p className={styles.qnaQuestion}>
                              <strong>{item.userName}</strong> -{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            <p className={styles.qnaContent}>{item.content}</p>
                            {item.answer && (
                              <div className={styles.qnaAnswer}>
                                <strong>답변:</strong> {item.answer}
                                {item.answeredAt && (
                                  <span className={styles.answerDate}>
                                    {" "}
                                    (
                                    {new Date(
                                      item.answeredAt
                                    ).toLocaleDateString()}
                                    )
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.placeholder}>
                      <p>아직 문의가 없습니다.</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
          <aside className={styles.sidebar}>
            <img
              className={styles.thumbnail}
              src={course.coverImageUrl}
              alt={course.title}
            />
            <div className={styles.summaryCard}>
              <dl className={styles.meta}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>난이도</dt>
                  <dd className={styles.metaValue}>{course.difficulty}</dd>
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
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                >
                  <img
                    className={styles.ctaIcon}
                    src="/assets/shopping-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  장바구니 담기
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckoutNow}
                >
                  바로 결제하기
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
