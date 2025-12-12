"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import styles from "@/shared/components/layout/Header.module.css";

export default function UserActions() {
  const userProfile = useAuthStore((state) => state.userProfile);

  if (!userProfile.nickName) {
    return (
      <Link href="/login" className={styles.dashboardLink}>
        로그인 하기
      </Link>
    );
  }

  return (
    <div className={styles.actions}>
      {userProfile.role === "INSTRUCTOR" && (
        <Link href="/instructor" className={styles.dashboardLink}>
          강사 대시보드
        </Link>
      )}

      <Link href="/cart" className={styles.actionButton} aria-label="장바구니">
        <img
          src="/assets/shopping-cart.svg"
          alt=""
          className={styles.actionIcon}
          aria-hidden="true"
        />
      </Link>
      <Link
        href="/mypage"
        className={styles.actionButton}
        aria-label="마이페이지"
      >
        <img src="/assets/user.svg" alt="" className={styles.actionIcon} />
      </Link>
    </div>
  );
}
