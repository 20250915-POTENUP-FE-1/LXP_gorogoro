import Link from "next/link";
import styles from "@/shared/components/layout/Header.module.css";
import { getMe } from "@/services/user.service";

const userProfile = {
  displayName: "윤선",
  role: "intructor",
};

export default function Header() {
  const user = getMe();
  console.log(user);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brandGroup}>
          <Link href="/" className={styles.brand}>
            GORO
          </Link>
          {userProfile ? (
            <div>{userProfile.displayName}님, 안녕하세요!</div>
          ) : (
            <div>로그인을 해보세요</div>
          )}
        </div>
        {userProfile ? (
          <div className={styles.actions}>
            {userProfile.role === "instructor" && (
              <Link href="/instructor" className={styles.dashboardLink}>
                강사 대시보드
              </Link>
            )}

            <Link
              href="/cart"
              className={styles.actionButton}
              aria-label="장바구니"
            >
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
              <img
                src="/assets/user.svg"
                alt=""
                className={styles.actionIcon}
              />
            </Link>
          </div>
        ) : (
          <Link href="/login" className={styles.dashboardLink}>
            로그인 하기
          </Link>
        )}
      </div>
    </header>
  );
}
