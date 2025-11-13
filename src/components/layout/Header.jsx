import { NavLink } from "react-router-dom";
import "./Header.css";

import cartIconUrl from "/assets/icons/shopping-cart.svg";
import userIconUrl from "/assets/icons/user.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand-group">
          <NavLink to="/" className="header__brand">
            GORO
          </NavLink>
          {/* <nav className="header__nav" aria-label="메인 메뉴">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  강좌
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  챌린지
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  멘토링
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  커뮤니티
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
        <div className="header__actions">
          <NavLink to="/instructor" className="header__dashboard-link">
            강사 대시보드
          </NavLink>
          <NavLink
            to="/cart"
            className="header__action-button"
            aria-label="장바구니"
          >
            <img
              src={cartIconUrl}
              alt=""
              className="header__action-icon"
              aria-hidden="true"
            />
          </NavLink>
          <NavLink
            to="/mypage"
            className="header__action-button"
            aria-label="마이페이지"
          >
            <img src={userIconUrl} alt="" className="header__action-icon" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
