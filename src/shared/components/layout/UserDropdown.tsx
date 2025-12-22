"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/actions/logout.action";
import { Button } from "@/shared/components/ui";
import styles from "./Header.module.css";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile, clearUser } = useAuthStore();

  if (!userProfile) return null;

  const handleLogout = async () => {
    clearUser();
    await logoutAction();
  };

  return (
    <div
      className={styles.userDropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        variant="ghost"
        className={styles.userTrigger}
        aria-expanded={isOpen}
      >
        <span className={styles.userName}>{userProfile.nickname}님</span>
        <span className={styles.arrow}>{isOpen ? "↑" : "↓"}</span>
      </Button>

      {isOpen && (
        <div className={styles.userMenu}>
          <div className={styles.dropdownHeader}>
            <p className={styles.userEmail}>{userProfile.role}</p>
          </div>
          <div className={styles.dropdownDivider} />
          <Link
            href="/mypage"
            className={styles.dropdownItem}
            onClick={() => setIsOpen(false)}
          >
            마이페이지
          </Link>
          {userProfile.role === "INSTRUCTOR" && (
            <Link
              href="/instructor"
              className={styles.dropdownItem}
              onClick={() => setIsOpen(false)}
            >
              강사 대시보드 가기
            </Link>
          )}
          <div className={styles.dropdownDivider} />
          <button className={styles.dropdownItemDanger} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
