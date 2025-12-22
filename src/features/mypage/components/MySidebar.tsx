"use client";

import Link from "next/link";
import styles from "./MySidebar.module.css";
import { logoutAction } from "@/features/auth/actions/logout.action";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/shared/components/ui";

export default function MySidebar() {
  const { userProfile, clearUser } = useAuthStore();

  const handleLogout = async () => {
    clearUser(); // zustand 상태 초기화 (localStorage도 자동 반영)
    await logoutAction(); // 서버 쿠키 삭제 및 리다이렉트
  };

  return (
    <aside className={styles.sidebar} aria-label="마이페이지 사이드바">
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <span className={styles.name}>
            {userProfile?.nickname || "GUEST"}
          </span>
          <span className={styles.email}>{userProfile?.role}</span>
        </div>
      </div>
      <nav className={styles.nav} aria-label="마이페이지 메뉴">
        <Link href="/mypage/profile" className={styles.navItem}>
          프로필
        </Link>
        <Link href="/mypage/enrollment" className={styles.navItem}>
          수강 중인 강좌
        </Link>
        <Button
          variant="ghost"
          className={`${styles.navItem} ${styles.navItemLogout} block w-full text-left`}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </nav>
    </aside>
  );
}
