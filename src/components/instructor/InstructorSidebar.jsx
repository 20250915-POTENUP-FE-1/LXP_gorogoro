import { Link } from "react-router-dom";
import "./InstructorSidebar.css";

function InstructorSidebar() {
  return (
    <aside className="instructor-sidebar" aria-label="강사 사이드바">
      <div className="instructor-sidebar__profile">
        <div className="instructor-sidebar__avatar">JD</div>
        <div className="instructor-sidebar__info">
          <span className="instructor-sidebar__name">Jane Doe</span>
          <span className="instructor-sidebar__email">
            jane.doe@example.com
          </span>
        </div>
      </div>
      <nav className="instructor-sidebar__nav" aria-label="강사 메뉴">
        <Link className="instructor-sidebar__nav-item" to="courses">
          대시보드
        </Link>
        <Link className="instructor-sidebar__nav-item" to="courses/create">
          새 강좌 만들기
        </Link>
      </nav>
    </aside>
  );
}

export default InstructorSidebar;
