// 로그아웃
"use client";

import Link from "next/link";
import styles from "./MySidebar.module.css";

const userProfile = {
  displayName: "윤선",
  email: "ys@gmail.com",
};

export default function MySidebar() {
  const handleLogoutClick = async () => {
    // const result = await dispatch(logout());
    // if (result.meta.requestStatus === "fulfilled") {
    //   navigate("/login", { replace: true });
    // }
    // if (result.meta.requestStatus === "rejected") {
    //   alert("실패함 ㅠ");
    // }
  };

  return (
    <aside className={styles.sidebar} aria-label="마이페이지 사이드바">
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <span className={styles.name}>{userProfile.displayName}</span>
          <span className={styles.email}>{userProfile.email}</span>
        </div>
      </div>
      <nav className={styles.nav} aria-label="마이페이지 메뉴">
        <Link href="/mypage/profile" className={styles.navItem}>
          프로필
        </Link>
        <Link href="/mypage/enrollments" className={styles.navItem}>
          수강 중인 강좌
        </Link>
        <button
          className={`${styles.navItem} ${styles.navItemLogout}`}
          type="button"
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </nav>
    </aside>
  );
}
