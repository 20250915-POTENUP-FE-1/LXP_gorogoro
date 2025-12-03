import Link from "next/link";
import "./InstructorSidebar.css";

export default function InstructorSidebar() {
  return (
    <aside className="instructor-sidebar" aria-label="강사 사이드바">
      <div className="instructor-sidebar__profile">
        <div className="instructor-sidebar__avatar"></div>
        <div className="instructor-sidebar__info">
          <span className="instructor-sidebar__name"></span>
          <span className="instructor-sidebar__email"></span>
        </div>
      </div>
      <nav className="instructor-sidebar__nav" aria-label="강사 메뉴">
        <Link className="instructor-sidebar__nav-item" href="">
          대시보드
        </Link>
        <Link
          className="instructor-sidebar__nav-item"
          href="/instructor/courses"
        >
          내가 생성한 강좌 목록
        </Link>
        <Link
          className="instructor-sidebar__nav-item"
          href="/instructor/courses/create"
        >
          새 강좌 만들기
        </Link>
      </nav>
    </aside>
  );
}
