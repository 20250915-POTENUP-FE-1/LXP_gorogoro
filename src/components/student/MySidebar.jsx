import "./MySidebar.css";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MySidebar() {
  // const userProfile = useSelector((state) => state.auth.userProfile);

  return (
    <aside className="my-sidebar" aria-label="마이페이지 사이드바">
      <div className="my-sidebar__profile">
        <div className="my-sidebar__avatar"></div>
        <div className="my-sidebar__info">
          <span className="my-sidebar__name">사용자 이름</span>
          <span className="my-sidebar__email">사용자 이메일</span>
        </div>
      </div>
      <nav className="my-sidebar__nav" aria-label="마이페이지 메뉴">
        <NavLink to="/mypage/profile" className="my-sidebar__nav-item" end>
          프로필
        </NavLink>
        <NavLink to="/mypage/enrollments" className="my-sidebar__nav-item" end>
          수강 중인 강좌
        </NavLink>
        <button
          className="my-sidebar__nav-item my-sidebar__nav-item--logout"
          type="button"
        >
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

export default MySidebar;
