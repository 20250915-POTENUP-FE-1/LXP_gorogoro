import Link from "next/link";

import "@/shared/components/layout/Header.css";

const userProfile = {
  displayName: "윤선",
  role: "intructor",
};

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand-group">
          <Link href="/" className="header__brand">
            GORO
          </Link>
          {userProfile ? (
            <div>{userProfile.displayName}님, 안녕하세요!</div>
          ) : (
            <div>로그인을 해보세요</div>
          )}
        </div>
        {userProfile ? (
          <div className="header__actions">
            {userProfile.role === "instructor" && (
              <Link href="/instructor" className="header__dashboard-link">
                강사 대시보드
              </Link>
            )}

            <Link
              href="/cart"
              className="header__action-button"
              aria-label="장바구니"
            >
              <img
                src="/assets/shopping-cart.svg"
                alt=""
                className="header__action-icon"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/mypage"
              className="header__action-button"
              aria-label="마이페이지"
            >
              <img
                src="/assets/user.svg"
                alt=""
                className="header__action-icon"
              />
            </Link>
          </div>
        ) : (
          <Link href="/login" className="header__dashboard-link">
            로그인 하기
          </Link>
        )}
      </div>
    </header>
  );
}
