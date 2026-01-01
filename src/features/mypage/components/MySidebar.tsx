"use client";

import Link from "next/link";
import styles from "./MySidebar.module.css";
import { logoutAction } from "@/features/auth/actions/logout.action";
import { useAuthStore } from "@/stores/useAuthStore";
import Avatar from "@/shared/components/ui/avatar/Avatar/Avatar";
import { Button } from "@/shared/components/ui/button/Button";

export default function MySidebar() {
  const { userProfile, clearUser } = useAuthStore((state) => ({
    userProfile: state.userProfile,
    clearUser: state.clearUser,
  }));
  // const userProfile = useAuthStore((state)=>(state.useProfile)
  // const clearUser = useAuthStore((state)=>state.clearUser)

  const handleLogout = async () => {
    clearUser(); // zustand 상태 초기화 (localStorage도 자동 반영)
    await logoutAction(); // 서버 쿠키 삭제 및 리다이렉트
  };

  return (
    <aside className={styles.sidebar} aria-label="마이페이지 사이드바">
      <Avatar nickname={userProfile?.nickname} role={userProfile?.role} />
      <nav className={styles.nav} aria-label="마이페이지 메뉴">
        <Link href="/mypage/profile" className={styles.navItem}>
          프로필
        </Link>
        <Link href="/mypage/enrollment" className={styles.navItem}>
          수강 중인 강좌
        </Link>
        <Button
          variant="navItem"
          type="button"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </nav>
    </aside>
  );
}
