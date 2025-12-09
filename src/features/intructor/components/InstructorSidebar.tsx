import Link from "next/link";
import styles from "./InstructorSidebar.module.css";

export default function InstructorSidebar() {
  return (
    <aside className={styles.sidebar} aria-label="강사 사이드바">
      <div className={styles.profile}>
        <div className={styles.avatar}></div>
        <div className={styles.info}>
          <span className={styles.name}></span>
          <span className={styles.email}></span>
        </div>
      </div>
      <nav className={styles.nav} aria-label="강사 메뉴">
        <Link className={styles.navItem} href="/instructor/dashboard">
          대시보드
        </Link>
        <Link className={styles.navItem} href="/instructor/courses">
          내가 생성한 강좌 목록
        </Link>
        <Link className={styles.navItem} href="/instructor/create">
          새 강좌 만들기
        </Link>
      </nav>
    </aside>
  );
}
