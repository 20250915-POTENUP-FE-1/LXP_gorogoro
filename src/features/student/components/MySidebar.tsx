// 로그아웃
"use client";

import Link from "next/link";
import "./MySidebar.css";

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
    <aside className="my-sidebar" aria-label="마이페이지 사이드바">
      <div className="my-sidebar__profile">
        <div className="my-sidebar__avatar"></div>
        <div className="my-sidebar__info">
          <span className="my-sidebar__name">{userProfile.displayName}</span>
          <span className="my-sidebar__email">{userProfile.email}</span>
        </div>
      </div>
      <nav className="my-sidebar__nav" aria-label="마이페이지 메뉴">
        <Link href="/mypage/profile" className="my-sidebar__nav-item">
          프로필
        </Link>
        <Link href="/mypage/enrollments" className="my-sidebar__nav-item">
          수강 중인 강좌
        </Link>
        <button
          className="my-sidebar__nav-item my-sidebar__nav-item--logout"
          type="button"
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </nav>
    </aside>
  );
}
