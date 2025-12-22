"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import styles from "@/shared/components/layout/Header.module.css";
import UserDropdown from "./UserDropdown";

export default function UserActions() {
  const userProfile = useAuthStore((state) => state.userProfile);

  if (!userProfile) {
    return (
      <Link href="/login" className={styles.dashboardLink}>
        로그인 하기
      </Link>
    );
  }

  return (
    <div className={styles.actions}>
      <Link href="/cart" className={styles.actionButton} aria-label="장바구니">
        <img
          src="/assets/shopping-cart.svg"
          alt=""
          className={styles.actionIcon}
          aria-hidden="true"
        />
      </Link>
      <UserDropdown />
    </div>
  );
}
