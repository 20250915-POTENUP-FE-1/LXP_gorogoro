import { NavLink } from "react-router-dom";
import "./InstructorSidebar.css";

function InstructorSidebar() {
  return (
    <aside className="instructor-sidebar" aria-label="강사 사이드바">
      <div className="instructor-sidebar__profile">
        <div className="instructor-sidebar__avatar">JD</div>
        <div className="instructor-sidebar__info">
          <span className="instructor-sidebar__name">Christina Ahn</span>
          <span className="instructor-sidebar__email">
            jane.doe@example.com
          </span>
        </div>
      </div>
      <nav className="instructor-sidebar__nav" aria-label="강사 메뉴">
        <NavLink className="instructor-sidebar__nav-item" to="courses" end>
          대시보드
        </NavLink>
        <NavLink className="instructor-sidebar__nav-item" to="courses/create">
          새 강좌 만들기
        </NavLink>
      </nav>
    </aside>
  );
}

export default InstructorSidebar;
