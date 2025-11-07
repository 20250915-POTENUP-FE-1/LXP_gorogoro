import "./MySidebar.css";

function MySidebar() {
  return (
    <aside className="my-sidebar" aria-label="마이페이지 사이드바">
      <div className="my-sidebar__profile">
        <div className="my-sidebar__avatar">SH</div>
        <div className="my-sidebar__info">
          <span className="my-sidebar__name">조성훈</span>
          <span className="my-sidebar__email">user.email@example.com</span>
        </div>
      </div>
      <nav className="my-sidebar__nav" aria-label="마이페이지 메뉴">
        <button className="my-sidebar__nav-item" type="button">
          프로필
        </button>
        <button
          className="my-sidebar__nav-item my-sidebar__nav-item--active"
          type="button"
        >
          수강 중인 강좌
        </button>
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
